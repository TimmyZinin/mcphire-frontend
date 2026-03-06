#!/usr/bin/env python3
"""Collect salary and job market data from hh.ru API for 10 IT roles."""

import json
import time
import statistics
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError

HEADERS = {"User-Agent": "SborkaCareerBot/1.0 (tim.zinin@gmail.com)"}
BASE_URL = "https://api.hh.ru/vacancies"
DELAY = 0.5

CURRENCY_RATES = {"RUR": 1, "RUB": 1, "USD": 92, "EUR": 100, "KZT": 0.19, "UAH": 2.5, "BYR": 28, "UZS": 0.007, "AZN": 54, "GEL": 34}

ROLES = [
    {"role": "Python Developer", "roleRu": "Python-разработчик", "slug": "python-developer", "query": "Python разработчик"},
    {"role": "Frontend Developer", "roleRu": "Frontend-разработчик", "slug": "frontend-developer", "query": "Frontend разработчик"},
    {"role": "Backend Developer", "roleRu": "Backend-разработчик", "slug": "backend-developer", "query": "Backend разработчик"},
    {"role": "DevOps Engineer", "roleRu": "DevOps-инженер", "slug": "devops-engineer", "query": "DevOps инженер"},
    {"role": "QA Engineer", "roleRu": "QA-инженер", "slug": "qa-engineer", "query": "QA инженер"},
    {"role": "Product Manager", "roleRu": "Product Manager", "slug": "product-manager", "query": "Product Manager"},
    {"role": "Data Scientist", "roleRu": "Data Scientist", "slug": "data-scientist", "query": "Data Scientist"},
    {"role": "Java Developer", "roleRu": "Java-разработчик", "slug": "java-developer", "query": "Java разработчик"},
    {"role": "Mobile Developer", "roleRu": "Mobile-разработчик", "slug": "mobile-developer", "query": "Mobile разработчик"},
    {"role": "UX/UI Designer", "roleRu": "UX/UI-дизайнер", "slug": "ux-ui-designer", "query": "UX UI дизайнер"},
]

EXPERIENCE_LEVELS = [
    ("junior", "noExperience"),
    ("middle", "between1And3"),
    ("senior", "between3And6"),
    ("lead", "moreThan6"),
]

AREAS = [
    ("moscow", {"area": "1"}),
    ("spb", {"area": "2"}),
    ("russia", {}),
    ("remote", {"schedule": "remote"}),
]

OUTPUT_DIR = Path(__file__).parent


def api_get(params: dict) -> dict:
    """Make a GET request to hh.ru API."""
    url = BASE_URL + "?" + urlencode(params)
    req = Request(url, headers=HEADERS)
    try:
        with urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        print(f"  HTTP {e.code} for {params.get('text', '?')} — skipping")
        return {"found": 0, "items": []}


def to_rub(amount: float, currency: str) -> float:
    """Convert salary to RUB."""
    rate = CURRENCY_RATES.get(currency, 1)
    return amount * rate


def extract_salaries(items: list) -> list[float]:
    """Extract salary values in RUB from vacancy items."""
    salaries = []
    for item in items:
        s = item.get("salary")
        if not s:
            continue
        cur = s.get("currency", "RUR")
        fr = s.get("from")
        to = s.get("to")
        if fr and to:
            val = (fr + to) / 2
        elif fr:
            val = fr
        elif to:
            val = to
        else:
            continue
        salaries.append(to_rub(val, cur))
    return salaries


def salary_stats(salaries: list[float]) -> dict:
    """Calculate median, p25, p75."""
    if not salaries:
        return {"salaryMedian": None, "salaryP25": None, "salaryP75": None}
    s = sorted(salaries)
    n = len(s)
    return {
        "salaryMedian": int(statistics.median(s)),
        "salaryP25": int(s[max(0, n // 4)]),
        "salaryP75": int(s[min(n - 1, 3 * n // 4)]),
    }


def query_vacancies(text: str, experience: str, extra_params: dict) -> dict:
    """Query vacancies and return stats."""
    params = {
        "text": text,
        "experience": experience,
        "per_page": "20",
        "only_with_salary": "false",
    }
    params.update(extra_params)

    data = api_get(params)
    time.sleep(DELAY)

    found = data.get("found", 0)
    items = data.get("items", [])
    salaries = extract_salaries(items)
    stats = salary_stats(salaries)

    return {"vacancies": found, **stats}


def collect_skills_and_employers(text: str) -> tuple[list[str], list[str]]:
    """Collect top skills and employers across all experience levels."""
    skill_counts: dict[str, int] = {}
    employer_set: set[str] = set()

    # Query broadly (no experience filter) to get diverse skills/employers
    for page in range(2):
        params = {"text": text, "per_page": "20", "page": str(page)}
        data = api_get(params)
        time.sleep(DELAY)

        for item in data.get("items", []):
            # Employers
            emp = item.get("employer", {})
            name = emp.get("name")
            if name:
                employer_set.add(name)

            # Key skills — need to fetch individual vacancy for detailed skills
            # But snippet.requirement often has them too
            snippet = item.get("snippet", {})
            req_text = snippet.get("requirement", "") or ""
            resp_text = snippet.get("responsibility", "") or ""

        # Also try to get key_skills from individual vacancies (first 5)
        for item in data.get("items", [])[:5]:
            vac_id = item.get("id")
            if not vac_id:
                continue
            try:
                vac_url = f"https://api.hh.ru/vacancies/{vac_id}"
                req = Request(vac_url, headers=HEADERS)
                with urlopen(req, timeout=10) as resp:
                    vac_data = json.loads(resp.read().decode("utf-8"))
                for skill in vac_data.get("key_skills", []):
                    name = skill.get("name")
                    if name:
                        skill_counts[name] = skill_counts.get(name, 0) + 1
                time.sleep(DELAY)
            except Exception:
                continue

    top_skills = sorted(skill_counts, key=skill_counts.get, reverse=True)[:10]
    top_employers = sorted(employer_set)[:7]

    return top_skills, top_employers


def collect_role(role_info: dict) -> dict:
    """Collect all data for one role."""
    text = role_info["query"]
    print(f"\n{'='*60}")
    print(f"Collecting: {role_info['role']} ({text})")
    print(f"{'='*60}")

    grades = {}
    for grade_name, exp_value in EXPERIENCE_LEVELS:
        grade_data = {}
        for area_name, area_params in AREAS:
            print(f"  {grade_name}/{area_name}...", end=" ", flush=True)
            stats = query_vacancies(text, exp_value, area_params)
            grade_data[area_name] = stats
            print(f"found={stats['vacancies']}, median={stats['salaryMedian']}")
        grades[grade_name] = grade_data

    print(f"  Collecting skills & employers...")
    top_skills, top_employers = collect_skills_and_employers(text)
    print(f"  Skills: {top_skills[:5]}...")
    print(f"  Employers: {top_employers[:3]}...")

    return {
        "role": role_info["role"],
        "roleRu": role_info["roleRu"],
        "slug": role_info["slug"],
        "fetchedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "grades": grades,
        "topSkills": top_skills,
        "topEmployers": top_employers,
    }


def main():
    print("Starting hh.ru data collection...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Roles: {len(ROLES)}, Levels: {len(EXPERIENCE_LEVELS)}, Areas: {len(AREAS)}")
    total_queries = len(ROLES) * len(EXPERIENCE_LEVELS) * len(AREAS)
    print(f"Total vacancy queries: {total_queries} + skills/employers queries")
    print(f"Estimated time: ~{total_queries * 0.6 + len(ROLES) * 12:.0f}s")

    for role_info in ROLES:
        result = collect_role(role_info)
        out_path = OUTPUT_DIR / f"{role_info['slug']}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"  Saved: {out_path}")

    print(f"\nDone! {len(ROLES)} files saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

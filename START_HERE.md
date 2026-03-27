# MCPHire Revenue Sprints — START HERE

**Duration:** 11 days (Mar 19-29, 2026)
**Goal:** 150K₽ MRR (15 paying customers)
**Effort:** 5-6 hours/day across team

---

## What Is This?

5 actionable sprints to get MCPHire to revenue through **B2B outreach**:

1. **R1 — Lead Research** (2 days): Find 50 best companies
2. **R2 — Deck & Pricing** (2 days): Create pricing page + dashboard
3. **R3 — Personal Outreach** (2 days): Тим emails 50 companies
4. **R4 — Pilots & Brand** (3 days): Close first deals + TG channel
5. **R5 — Scale** (2 days): Reach 15 customers

**Why it works:** Targeted outreach (not spray-and-pray) + personal touch + multiple channels.

---

## Read These Docs (in order)

**5 minutes:**
- [ ] This file (you're reading it)

**3 minutes:**
- [ ] `REVENUE_SPRINTS_SUMMARY.md` (root folder)

**10 minutes:**
- [ ] `.wiki/Revenue-Sprints-Index.md`

**Then, read by role:**

### If you're PM (Тим)
- [ ] `.wiki/Lead-Selection-Guide.md` — how to pick 50 companies
- [ ] `.wiki/Outreach-Email-Templates.md` — what emails to send
- [ ] `.wiki/Revenue-Metrics-Dashboard.md` — daily tracking

### If you're Engineer
- [ ] `.wiki/Technical-Tasks-for-R1-R5.md` — SQL, API, frontend tasks
- [ ] `.wiki/Revenue-Metrics-Dashboard.md` — tracking

### If you're Designer
- [ ] `.wiki/Pitch-Deck-Outline.md` — 5-slide deck structure
- [ ] `.wiki/Technical-Tasks-for-R1-R5.md` — design tasks

### Everyone
- [ ] `.wiki/Revenue-Metrics-Dashboard.md` — daily metrics (update daily!)

---

## The Plan (Visual)

```
MAR 19-20                 MAR 21-22           MAR 23-24        MAR 25-27      MAR 28-29
R1: Find 50      ──>      R2: Pitch       ──>  R3: Email 50  ──> R4: Pilots ──> R5: 15 Paid
companies               + Pricing             + Demos booked    + TG channel    customers
                         + Dashboard                           + Calculator    = 150K₽ MRR
```

---

## Key Stats

| What | Target | Effort |
|------|--------|--------|
| Lead database | 50 companies | 12 hours (PM) |
| Pricing page | Live | 6 hours (engineer) |
| Pitch deck | 5 slides | 3 hours (designer) |
| Outreach emails | 50 sent | 15 hours (Тим) |
| Demo calls | 2-3 booked | Included in R3 |
| TG channel | 500 followers | 5 hours (Тим) |
| Viral calculator | Live | 4 hours (engineer) |
| **First payment** | **By R4** | Included |
| **15 customers** | **By R5** | **52-66 hours total** |

---

## First Day (Mar 19, 9 AM)

1. **Read this file** (5 min)
2. **Read SUMMARY** (3 min) — root folder
3. **Read Revenue-Sprints-Index.md** (10 min) — .wiki/ folder
4. **Assign R1 tasks:**
   - Engineer: SQL query for lead selection
   - PM: Start LinkedIn enrichment
5. **Create Notion CRM** (5 min) — template for lead tracking
6. **Create Google Sheet** (5 min) — tracking metrics
7. **Start work** — target: 50 leads by end of Day 2

---

## Documentation Map

```
START_HERE.md (you are here)
    ↓
REVENUE_SPRINTS_SUMMARY.md (3 min read)
    ↓
.wiki/Revenue-Sprints-Index.md (10 min read)
    ↓
Then read by role:
├─ PM: Lead-Selection-Guide → Outreach-Templates → Metrics-Dashboard
├─ Engineer: Technical-Tasks → Metrics-Dashboard
├─ Designer: Pitch-Deck-Outline → Technical-Tasks
└─ Everyone: Metrics-Dashboard (daily)
```

**All files in `.wiki/` folder. Check sidebar for links.**

---

## Success Formula

✅ Right targeting (pain scoring, not random)
✅ Personal touch (templates, personalization)
✅ Multiple channels (email + TG + calculator)
✅ Fast feedback (daily tracking, quick pivots)
✅ Social proof (testimonials from first customers)

= 150K₽ MRR in 11 days

---

## Risks & Mitigations

| Risk | Likelihood | Fix |
|------|-----------|-----|
| No replies | MEDIUM | Better targeting (pain scoring), personalization |
| Pricing wrong | LOW | Lower Pro to 10K if feedback says too high |
| Payment breaks | MEDIUM | Start manual (invoices) not Stripe |
| TG doesn't grow | LOW | Daily posts + mentions in emails + LinkedIn |
| Database too small | LOW | S14-S19 runs parallel, 5K+ jobs by R4 |

---

## Team Checklist

Before launching R1:

**Engineer:**
- [ ] Have DB access
- [ ] Know how to connect to PostgreSQL
- [ ] Ready for SQL query (R1), pricing page (R2), calculator (R4)

**Designer:**
- [ ] Have Figma open or preferred design tool
- [ ] Read Pitch-Deck-Outline.md
- [ ] Know brand colors and typography

**PM (Тим):**
- [ ] Have 10-15 hours/week available
- [ ] LinkedIn account ready for enrichment
- [ ] Calendar clear for demos (R3-R5)

**Everyone:**
- [ ] Have read this START_HERE.md
- [ ] Know where `.wiki/` docs are
- [ ] Ready to track metrics daily

---

## Daily Rhythm

**9 AM:** Standup (5 min)
- What did we do yesterday?
- What are we doing today?
- Any blockers?

**Throughout day:** Work on sprint tasks

**5 PM:** Update metrics
- Track opens, clicks, replies (R3)
- Update customer count (R4-R5)
- Note learnings

**Friday 4 PM:** Weekly sync (15 min)
- Review metrics
- Adjust strategy if needed
- Plan next week

---

## Files You'll Touch

| Who | File | When | Purpose |
|-----|------|------|---------|
| Engineer | `scripts/find_leads.sql` | R1 day 1 | SQL query |
| Engineer | `src/pages/PricingPage.tsx` | R2 | Pricing page |
| Engineer | `src/pages/EmployerDashboard.tsx` | R2 | Dashboard |
| Engineer | `src/pages/CalculatorPage.tsx` | R4 | Calculator |
| Designer | `resources/mcphire-deck.pdf` | R2 | Pitch deck |
| PM | Google Sheet | R1-R5 | Lead tracking |
| PM | Notion | R1-R5 | CRM + tracking |
| Everyone | `.wiki/` | Daily | Reading + reference |

---

## Success Looks Like

**End of R5 (Mar 29):**

✅ 50 companies contacted
✅ 13 opens (26% open rate)
✅ 3 replies (6% reply rate)
✅ 2 demo calls completed (66% conversion)
✅ 15 paying customers (3 from email, 5 from TG, 5 from calculator, 2 other)
✅ 150K₽ MRR (5K Standard × 5 + 12K Pro × 5 + 25K Enterprise × 5 = not quite, but ~100K minimum)

**If you hit this:** Revenue sprint is a success. Scale in April.

---

## FAQ

**Q: Is this guaranteed to work?**
A: No. But it's based on solid B2B sales principles. Success depends on targeting (R1), execution (R3), and product readiness.

**Q: What if we only get 8 customers?**
A: Still a win. 80K₽ MRR = validation. Keep going in April.

**Q: Can I start before Mar 19?**
A: Yes. But R1-R5 should run sequentially. Starting earlier speeds things up.

**Q: Do I need all the documentation?**
A: No. Read what's relevant to your role. But everyone should read Quick-Start.md.

**Q: What if something fails in R1?**
A: Adjust and move on. Don't get stuck. Bad targeting? Re-segment. No emails? Use LinkedIn DM instead.

---

## Next Step

1. Read `REVENUE_SPRINTS_SUMMARY.md` (root) — **3 minutes**
2. Read `.wiki/Revenue-Sprints-Index.md` — **10 minutes**
3. Assign R1 tasks to engineer + PM
4. **Start work today (Mar 19)**

**Total:** ~20 minutes to be ready.

---

## Questions?

- **General:** See `.wiki/Revenue-Metrics-Dashboard.md` → FAQ section
- **R1 specific:** See `.wiki/Lead-Selection-Guide.md` → FAQ
- **R3 templates:** See `.wiki/Outreach-Email-Templates.md` → Common Objections
- **Technical:** See `.wiki/Technical-Tasks-for-R1-R5.md` → each task

---

**Let's make 150K₽ MRR happen.**

**Time: ~20 min to be ready**
**Start: Today at 9 AM**
**Target: Mar 31, 150K₽ MRR**

Go.

---

## Cheat Sheet: What to Read

**If you have 5 min:** This file
**If you have 10 min:** + REVENUE_SPRINTS_SUMMARY.md
**If you have 20 min:** + Revenue-Sprints-Index.md
**If you have 1 hour:** + Your role-specific docs
**If you have 2 hours:** Read everything in `.wiki/`

For everything: Check DOCUMENTATION_MANIFEST.md (reading order + file index).


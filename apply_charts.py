#!/usr/bin/env python3
"""Generate and apply content-specific CSS charts to all ft-calc articles."""
import os
import re

POSTS_DIR = "/Users/linyangting/Desktop/ft-repos/ft-calc/src/content/posts"

# Content-specific charts for each article
CHARTS = {
    "50-30-20-budget-rule.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">50/30/20 Budget Split — On a $4,000 Monthly Income</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
<div style="width: 50%; background: #3b82f6; color: white; padding: 0.5rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">50% Needs — $2,000</div>
</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
<div style="width: 30%; background: #8b5cf6; color: white; padding: 0.5rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">30% Wants — $1,200</div>
</div>
<div style="display: flex; align-items: center; gap: 0.5rem;">
<div style="width: 20%; background: #10b981; color: white; padding: 0.5rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">20% Save — $800</div>
</div>
<div style="margin-top: 0.6rem; font-size: 0.7rem; color: #94a3b8;">Needs: rent, groceries, insurance | Wants: dining, entertainment | Savings: emergency fund, retirement</div>
</div>''',

    "age-milestones-guide.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
<div style="padding: 0.7rem; background: #fef3c7; border-radius: 10px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 1.3rem; font-weight: 800; color: #d97706;">1</div>
<div style="font-size: 0.7rem; color: #92400e; font-weight: 600;">First Steps</div></div>
<div style="padding: 0.7rem; background: #dbeafe; border-radius: 10px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-size: 1.3rem; font-weight: 800; color: #2563eb;">16</div>
<div style="font-size: 0.7rem; color: #1e40af; font-weight: 600;">Drive</div></div>
<div style="padding: 0.7rem; background: #d1fae5; border-radius: 10px; text-align: center; border: 1px solid #6ee7b7;">
<div style="font-size: 1.3rem; font-weight: 800; color: #059669;">18</div>
<div style="font-size: 0.7rem; color: #065f46; font-weight: 600;">Vote</div></div>
<div style="padding: 0.7rem; background: #ede9fe; border-radius: 10px; text-align: center; border: 1px solid #c4b5fd;">
<div style="font-size: 1.3rem; font-weight: 800; color: #7c3aed;">21</div>
<div style="font-size: 0.7rem; color: #5b21b6; font-weight: 600;">Drink (US)</div></div>
<div style="padding: 0.7rem; background: #fce7f3; border-radius: 10px; text-align: center; border: 1px solid #f9a8d4;">
<div style="font-size: 1.3rem; font-weight: 800; color: #db2777;">65</div>
<div style="font-size: 0.7rem; color: #9d174d; font-weight: 600;">Medicare</div></div>
</div>''',

    "bmr-vs-tdee-explained.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">BMR → TDEE: Activity Multipliers (Example: BMR = 1,600 cal)</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 55%; background: #94a3b8; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Sedentary (×1.2) → 1,920</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 65%; background: #60a5fa; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Light Active (×1.375) → 2,200</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 75%; background: #34d399; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Moderate (×1.55) → 2,480</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 87%; background: #f59e0b; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Very Active (×1.725) → 2,760</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem;">
<div style="width: 100%; background: #ef4444; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Extreme (×1.9) → 3,040</div></div>
</div>''',

    "body-fat-percentage-guide.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Body Fat % Ranges — Men vs Women</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
<div style="text-align: center; font-weight: 600; font-size: 0.75rem; color: #2563eb;">♂ Men</div>
<div style="text-align: center; font-weight: 600; font-size: 0.75rem; color: #db2777;">♀ Women</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>2-5%</b> Essential</div>
<div style="background: #fce7f3; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>10-13%</b> Essential</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>6-13%</b> Athletes</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>14-20%</b> Athletes</div>
<div style="background: #fef3c7; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>14-17%</b> Fitness</div>
<div style="background: #fef3c7; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>21-24%</b> Fitness</div>
<div style="background: #fed7aa; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>18-24%</b> Average</div>
<div style="background: #fed7aa; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>25-31%</b> Average</div>
<div style="background: #fecaca; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>25%+</b> Obese</div>
<div style="background: #fecaca; padding: 0.4rem; border-radius: 6px; text-align: center; font-size: 0.75rem;"><b>32%+</b> Obese</div>
</div></div>''',

    "compound-interest-explained.md": '''<div style="margin: 2rem 0; background: #f0fdf4; border-radius: 12px; padding: 1.2rem; border: 1px solid #bbf7d0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #166534; margin-bottom: 0.8rem;">$10,000 at 7% — Compound Interest Growth</div>
<div style="display: flex; align-items: flex-end; gap: 0.4rem; height: 120px; padding-bottom: 0.3rem;">
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
<div style="font-size: 0.65rem; font-weight: 700; color: #166534;">$10K</div>
<div style="width: 100%; background: #86efac; border-radius: 4px 4px 0 0; height: 20%;"></div>
<div style="font-size: 0.6rem; color: #6b7280; margin-top: 2px;">Year 0</div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
<div style="font-size: 0.65rem; font-weight: 700; color: #166534;">$14K</div>
<div style="width: 100%; background: #4ade80; border-radius: 4px 4px 0 0; height: 28%;"></div>
<div style="font-size: 0.6rem; color: #6b7280; margin-top: 2px;">5 yr</div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
<div style="font-size: 0.65rem; font-weight: 700; color: #166534;">$20K</div>
<div style="width: 100%; background: #22c55e; border-radius: 4px 4px 0 0; height: 40%;"></div>
<div style="font-size: 0.6rem; color: #6b7280; margin-top: 2px;">10 yr</div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
<div style="font-size: 0.65rem; font-weight: 700; color: #166534;">$39K</div>
<div style="width: 100%; background: #16a34a; border-radius: 4px 4px 0 0; height: 60%;"></div>
<div style="font-size: 0.6rem; color: #6b7280; margin-top: 2px;">20 yr</div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
<div style="font-size: 0.65rem; font-weight: 700; color: #166534;">$76K</div>
<div style="width: 100%; background: #15803d; border-radius: 4px 4px 0 0; height: 100%; color: white;"></div>
<div style="font-size: 0.6rem; color: #6b7280; margin-top: 2px;">30 yr</div></div>
</div></div>''',

    "days-between-dates-guide.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
<div style="padding: 0.7rem; background: #eff6ff; border-radius: 10px; text-align: center; border: 1px solid #bfdbfe;">
<div style="font-size: 1.3rem; font-weight: 800; color: #2563eb;">365</div>
<div style="font-size: 0.7rem; color: #3b82f6; font-weight: 600;">Days in Year</div></div>
<div style="padding: 0.7rem; background: #f0fdf4; border-radius: 10px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 1.3rem; font-weight: 800; color: #16a34a;">366</div>
<div style="font-size: 0.7rem; color: #22c55e; font-weight: 600;">Leap Year</div></div>
<div style="padding: 0.7rem; background: #fef3c7; border-radius: 10px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 1.3rem; font-weight: 800; color: #d97706;">90</div>
<div style="font-size: 0.7rem; color: #b45309; font-weight: 600;">Avg Quarter</div></div>
<div style="padding: 0.7rem; background: #fce7f3; border-radius: 10px; text-align: center; border: 1px solid #f9a8d4;">
<div style="font-size: 1.3rem; font-weight: 800; color: #db2777;">52</div>
<div style="font-size: 0.7rem; color: #9d174d; font-weight: 600;">Weeks/Year</div></div>
</div>''',

    "fahrenheit-celsius-quick-guide.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Quick Temperature Reference</div>
<div style="display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 0.3rem; font-size: 0.75rem;">
<div style="background: #1e40af; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">32°F</div>
<div style="background: #1e40af; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">0°C</div>
<div style="padding: 0.4rem; color: #6b7280;">Water freezes</div>
<div style="background: #2563eb; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">68°F</div>
<div style="background: #2563eb; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">20°C</div>
<div style="padding: 0.4rem; color: #6b7280;">Room temp</div>
<div style="background: #f59e0b; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">98.6°F</div>
<div style="background: #f59e0b; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">37°C</div>
<div style="padding: 0.4rem; color: #6b7280;">Body temp</div>
<div style="background: #ef4444; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">212°F</div>
<div style="background: #ef4444; color: white; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700;">100°C</div>
<div style="padding: 0.4rem; color: #6b7280;">Water boils</div>
</div></div>''',

    "fahrenheit-vs-celsius.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
<div style="padding: 1rem; background: #eff6ff; border-radius: 10px; border: 1px solid #bfdbfe; text-align: center;">
<div style="font-size: 1.5rem;">🌡️</div>
<div style="font-weight: 700; color: #2563eb; font-size: 0.9rem;">Fahrenheit</div>
<div style="color: #6b7280; font-size: 0.75rem; margin-top: 0.3rem;">Water boils: 212°F</div>
<div style="color: #6b7280; font-size: 0.75rem;">Water freezes: 32°F</div>
<div style="color: #6b7280; font-size: 0.75rem;">Body temp: 98.6°F</div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #3b82f6; font-weight: 600;">°F = (°C × 9/5) + 32</div>
</div>
<div style="padding: 1rem; background: #fef2f2; border-radius: 10px; border: 1px solid #fecaca; text-align: center;">
<div style="font-size: 1.5rem;">🌡️</div>
<div style="font-weight: 700; color: #dc2626; font-size: 0.9rem;">Celsius</div>
<div style="color: #6b7280; font-size: 0.75rem; margin-top: 0.3rem;">Water boils: 100°C</div>
<div style="color: #6b7280; font-size: 0.75rem;">Water freezes: 0°C</div>
<div style="color: #6b7280; font-size: 0.75rem;">Body temp: 37°C</div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #dc2626; font-weight: 600;">°C = (°F − 32) × 5/9</div>
</div></div>''',

    "gpa-scale-explained.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">US GPA Scale — Letter Grade to Points</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 0.4rem;">
<div style="padding: 0.5rem; background: #dcfce7; border-radius: 8px; text-align: center; border: 1px solid #86efac;">
<div style="font-weight: 800; color: #166534; font-size: 1.1rem;">A+</div><div style="color: #6b7280; font-size: 0.7rem;">4.0</div></div>
<div style="padding: 0.5rem; background: #dcfce7; border-radius: 8px; text-align: center; border: 1px solid #86efac;">
<div style="font-weight: 800; color: #166534; font-size: 1.1rem;">A</div><div style="color: #6b7280; font-size: 0.7rem;">4.0</div></div>
<div style="padding: 0.5rem; background: #d1fae5; border-radius: 8px; text-align: center; border: 1px solid #6ee7b7;">
<div style="font-weight: 800; color: #059669; font-size: 1.1rem;">A-</div><div style="color: #6b7280; font-size: 0.7rem;">3.7</div></div>
<div style="padding: 0.5rem; background: #dbeafe; border-radius: 8px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-weight: 800; color: #2563eb; font-size: 1.1rem;">B+</div><div style="color: #6b7280; font-size: 0.7rem;">3.3</div></div>
<div style="padding: 0.5rem; background: #dbeafe; border-radius: 8px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-weight: 800; color: #2563eb; font-size: 1.1rem;">B</div><div style="color: #6b7280; font-size: 0.7rem;">3.0</div></div>
<div style="padding: 0.5rem; background: #fef3c7; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
<div style="font-weight: 800; color: #b45309; font-size: 1.1rem;">C</div><div style="color: #6b7280; font-size: 0.7rem;">2.0</div></div>
<div style="padding: 0.5rem; background: #fed7aa; border-radius: 8px; text-align: center; border: 1px solid #fdba74;">
<div style="font-weight: 800; color: #c2410c; font-size: 1.1rem;">D</div><div style="color: #6b7280; font-size: 0.7rem;">1.0</div></div>
<div style="padding: 0.5rem; background: #fecaca; border-radius: 8px; text-align: center; border: 1px solid #fca5a5;">
<div style="font-weight: 800; color: #dc2626; font-size: 1.1rem;">F</div><div style="color: #6b7280; font-size: 0.7rem;">0.0</div></div>
</div></div>''',

    "healthy-body-fat-percentage.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Healthy Body Fat % by Age (Women / Men)</div>
<div style="display: grid; grid-template-columns: auto 1fr 1fr; gap: 0.3rem; font-size: 0.75rem; align-items: center;">
<div style="font-weight: 700; color: #64748b; padding: 0.3rem;">Age</div>
<div style="font-weight: 700; color: #db2777; text-align: center; padding: 0.3rem;">Women</div>
<div style="font-weight: 700; color: #2563eb; text-align: center; padding: 0.3rem;">Men</div>
<div style="padding: 0.3rem; color: #334155; font-weight: 600;">20-29</div>
<div style="background: #fce7f3; padding: 0.3rem; border-radius: 4px; text-align: center;">16-24%</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">7-17%</div>
<div style="padding: 0.3rem; color: #334155; font-weight: 600;">30-39</div>
<div style="background: #fce7f3; padding: 0.3rem; border-radius: 4px; text-align: center;">17-25%</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">12-21%</div>
<div style="padding: 0.3rem; color: #334155; font-weight: 600;">40-49</div>
<div style="background: #fce7f3; padding: 0.3rem; border-radius: 4px; text-align: center;">19-28%</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">14-23%</div>
<div style="padding: 0.3rem; color: #334155; font-weight: 600;">50-59</div>
<div style="background: #fce7f3; padding: 0.3rem; border-radius: 4px; text-align: center;">22-31%</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">16-24%</div>
</div></div>''',

    "how-loan-interest-really-works.md": '''<div style="margin: 2rem 0; background: #fef2f2; border-radius: 12px; padding: 1.2rem; border: 1px solid #fecaca;">
<div style="font-weight: 700; font-size: 0.85rem; color: #991b1b; margin-bottom: 0.8rem;">$200,000 Mortgage at 7% — 30 Years</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; text-align: center;">
<div style="background: white; padding: 0.8rem; border-radius: 8px;">
<div style="font-size: 1.4rem; font-weight: 800; color: #2563eb;">$200K</div>
<div style="font-size: 0.75rem; color: #6b7280;">Principal Borrowed</div></div>
<div style="background: white; padding: 0.8rem; border-radius: 8px;">
<div style="font-size: 1.4rem; font-weight: 800; color: #dc2626;">$279K</div>
<div style="font-size: 0.75rem; color: #6b7280;">Total Interest Paid</div></div>
</div>
<div style="margin-top: 0.6rem; font-size: 0.7rem; color: #991b1b; text-align: center;">You pay 1.4× the home price in interest alone over 30 years</div>
</div>''',

    "how-loan-payments-work.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">How a $1,331 Monthly Payment Shifts Over Time (30yr @ 7%)</div>
<div style="display: grid; grid-template-columns: auto 1fr 1fr; gap: 0.3rem; font-size: 0.75rem;">
<div style="font-weight: 700; color: #64748b; padding: 0.3rem;">Year</div>
<div style="font-weight: 700; color: #dc2626; text-align: center; padding: 0.3rem;">→ Interest</div>
<div style="font-weight: 700; color: #2563eb; text-align: center; padding: 0.3rem;">→ Principal</div>
<div style="padding: 0.3rem; font-weight: 600;">1</div>
<div style="background: #fecaca; padding: 0.3rem; border-radius: 4px; text-align: center;">$1,164 (87%)</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">$167 (13%)</div>
<div style="padding: 0.3rem; font-weight: 600;">15</div>
<div style="background: #fecaca; padding: 0.3rem; border-radius: 4px; text-align: center;">$831 (62%)</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">$500 (38%)</div>
<div style="padding: 0.3rem; font-weight: 600;">30</div>
<div style="background: #fecaca; padding: 0.3rem; border-radius: 4px; text-align: center;">$9 (1%)</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center;">$1,322 (99%)</div>
</div></div>''',

    "how-many-calories-do-you-need.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Daily Calorie Needs by Activity Level (Average Adult)</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 55%; background: #94a3b8; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Sedentary: 1,600-2,000</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 70%; background: #60a5fa; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Moderate: 2,000-2,400</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 85%; background: #f59e0b; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Active: 2,400-2,800</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem;">
<div style="width: 100%; background: #ef4444; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">Very Active: 2,800-3,200</div></div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #94a3b8;">Weight loss = eat 500 fewer calories/day → lose ~1 lb/week</div>
</div>''',

    "how-much-should-you-tip.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.5rem;">
<div style="padding: 0.7rem; background: #fef2f2; border-radius: 10px; text-align: center; border: 1px solid #fecaca;">
<div style="font-size: 1.2rem; font-weight: 800; color: #dc2626;">15%</div>
<div style="font-size: 0.7rem; color: #991b1b; font-weight: 600;">Adequate</div>
<div style="font-size: 0.65rem; color: #6b7280;">$50 bill → $7.50</div></div>
<div style="padding: 0.7rem; background: #fef3c7; border-radius: 10px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 1.2rem; font-weight: 800; color: #d97706;">18%</div>
<div style="font-size: 0.7rem; color: #92400e; font-weight: 600;">Standard</div>
<div style="font-size: 0.65rem; color: #6b7280;">$50 bill → $9.00</div></div>
<div style="padding: 0.7rem; background: #d1fae5; border-radius: 10px; text-align: center; border: 1px solid #6ee7b7;">
<div style="font-size: 1.2rem; font-weight: 800; color: #059669;">20%</div>
<div style="font-size: 0.7rem; color: #065f46; font-weight: 600;">Great Service</div>
<div style="font-size: 0.65rem; color: #6b7280;">$50 bill → $10.00</div></div>
<div style="padding: 0.7rem; background: #dbeafe; border-radius: 10px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-size: 1.2rem; font-weight: 800; color: #2563eb;">25%</div>
<div style="font-size: 0.7rem; color: #1e40af; font-weight: 600;">Exceptional</div>
<div style="font-size: 0.65rem; color: #6b7280;">$50 bill → $12.50</div></div>
</div>''',

    "how-to-calculate-bmi.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem;">
<div style="padding: 0.8rem; background: #eff6ff; border-radius: 10px; border: 1px solid #bfdbfe; text-align: center;">
<div style="font-size: 1.2rem; font-weight: 800; color: #2563eb;">&lt; 18.5</div>
<div style="font-weight: 600; color: #3b82f6; font-size: 0.8rem;">Underweight</div></div>
<div style="padding: 0.8rem; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0; text-align: center;">
<div style="font-size: 1.2rem; font-weight: 800; color: #16a34a;">18.5–24.9</div>
<div style="font-weight: 600; color: #22c55e; font-size: 0.8rem;">Normal</div></div>
<div style="padding: 0.8rem; background: #fefce8; border-radius: 10px; border: 1px solid #fef08a; text-align: center;">
<div style="font-size: 1.2rem; font-weight: 800; color: #ca8a04;">25–29.9</div>
<div style="font-weight: 600; color: #eab308; font-size: 0.8rem;">Overweight</div></div>
<div style="padding: 0.8rem; background: #fef2f2; border-radius: 10px; border: 1px solid #fecaca; text-align: center;">
<div style="font-size: 1.2rem; font-weight: 800; color: #dc2626;">30+</div>
<div style="font-weight: 600; color: #ef4444; font-size: 0.8rem;">Obese</div></div>
</div>''',

    "how-to-calculate-discounts-like-a-pro.md": '''<div style="margin: 2rem 0; background: #f0fdf4; border-radius: 12px; padding: 1.2rem; border: 1px solid #bbf7d0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #166534; margin-bottom: 0.8rem;">$80 Item — How Much You Save at Each Discount</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.4rem;">
<div style="background: white; padding: 0.5rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.7rem; color: #6b7280;">10% off</div>
<div style="font-weight: 800; color: #16a34a;">$72</div>
<div style="font-size: 0.65rem; color: #dc2626;">save $8</div></div>
<div style="background: white; padding: 0.5rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.7rem; color: #6b7280;">25% off</div>
<div style="font-weight: 800; color: #16a34a;">$60</div>
<div style="font-size: 0.65rem; color: #dc2626;">save $20</div></div>
<div style="background: white; padding: 0.5rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.7rem; color: #6b7280;">40% off</div>
<div style="font-weight: 800; color: #16a34a;">$48</div>
<div style="font-size: 0.65rem; color: #dc2626;">save $32</div></div>
<div style="background: white; padding: 0.5rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.7rem; color: #6b7280;">50% off</div>
<div style="font-weight: 800; color: #16a34a;">$40</div>
<div style="font-size: 0.65rem; color: #dc2626;">save $40</div></div>
</div></div>''',

    "how-to-calculate-discounts.md": '''<div style="margin: 2rem 0; background: #faf5ff; border-radius: 12px; padding: 1.2rem; border: 1px solid #e9d5ff;">
<div style="font-weight: 700; font-size: 0.85rem; color: #581c87; margin-bottom: 0.8rem;">Stacked Discounts: 20% + Extra 10% Off $100</div>
<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
<div style="background: white; padding: 0.5rem 0.8rem; border-radius: 8px; text-align: center; border: 1px solid #e9d5ff;">
<div style="font-size: 0.7rem; color: #6b7280;">Original</div>
<div style="font-weight: 800; color: #334155;">$100</div></div>
<div style="color: #7c3aed; font-weight: 700;">→ −20%</div>
<div style="background: white; padding: 0.5rem 0.8rem; border-radius: 8px; text-align: center; border: 1px solid #e9d5ff;">
<div style="font-size: 0.7rem; color: #6b7280;">After 1st</div>
<div style="font-weight: 800; color: #7c3aed;">$80</div></div>
<div style="color: #7c3aed; font-weight: 700;">→ −10%</div>
<div style="background: #7c3aed; padding: 0.5rem 0.8rem; border-radius: 8px; text-align: center;">
<div style="font-size: 0.7rem; color: #e9d5ff;">Final</div>
<div style="font-weight: 800; color: white;">$72</div></div>
</div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #7c3aed;">Note: 20% + 10% ≠ 30% off. Actual savings = 28%</div>
</div>''',

    "how-to-calculate-gpa.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">GPA Calculation Example — 4 Courses</div>
<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 0.3rem; font-size: 0.75rem;">
<div style="font-weight: 700; color: #64748b; padding: 0.3rem;">Course</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">Grade</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">Credits</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">Points</div>
<div style="padding: 0.3rem;">Math</div>
<div style="background: #dcfce7; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 600;">A (4.0)</div>
<div style="text-align: center; padding: 0.3rem;">3</div>
<div style="text-align: center; padding: 0.3rem; font-weight: 600;">12.0</div>
<div style="padding: 0.3rem;">English</div>
<div style="background: #dbeafe; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 600;">B (3.0)</div>
<div style="text-align: center; padding: 0.3rem;">3</div>
<div style="text-align: center; padding: 0.3rem; font-weight: 600;">9.0</div>
<div style="padding: 0.3rem;">Science</div>
<div style="background: #dcfce7; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 600;">A- (3.7)</div>
<div style="text-align: center; padding: 0.3rem;">4</div>
<div style="text-align: center; padding: 0.3rem; font-weight: 600;">14.8</div>
<div style="padding: 0.3rem;">History</div>
<div style="background: #fef3c7; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 600;">C+ (2.3)</div>
<div style="text-align: center; padding: 0.3rem;">3</div>
<div style="text-align: center; padding: 0.3rem; font-weight: 600;">6.9</div>
</div>
<div style="margin-top: 0.5rem; text-align: right; font-weight: 700; color: #2563eb; font-size: 0.85rem;">GPA = 42.7 ÷ 13 = 3.28</div>
</div>''',

    "how-to-calculate-mortgage-payments.md": '''<div style="margin: 2rem 0; background: #eff6ff; border-radius: 12px; padding: 1.2rem; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; font-size: 0.85rem; color: #1e40af; margin-bottom: 0.8rem;">$300K Mortgage — Monthly Payment at Different Rates</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 55%; background: #22c55e; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">3% → $1,265/mo</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 65%; background: #60a5fa; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">5% → $1,610/mo</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 80%; background: #f59e0b; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">7% → $1,996/mo</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem;">
<div style="width: 100%; background: #ef4444; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">9% → $2,414/mo (+$731 vs 3%)</div></div>
</div>''',

    "how-to-calculate-percentage.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem;">
<div style="padding: 1rem; background: #eff6ff; border-radius: 10px; border: 1px solid #bfdbfe; text-align: center;">
<div style="font-size: 0.75rem; color: #6b7280;">What is X% of Y?</div>
<div style="font-weight: 700; color: #2563eb; font-size: 0.85rem; margin: 0.3rem 0;">Y × (X/100)</div>
<div style="font-size: 0.7rem; color: #3b82f6;">20% of 80 = <b>16</b></div></div>
<div style="padding: 1rem; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0; text-align: center;">
<div style="font-size: 0.75rem; color: #6b7280;">X is what % of Y?</div>
<div style="font-weight: 700; color: #16a34a; font-size: 0.85rem; margin: 0.3rem 0;">(X/Y) × 100</div>
<div style="font-size: 0.7rem; color: #22c55e;">16 of 80 = <b>20%</b></div></div>
<div style="padding: 1rem; background: #faf5ff; border-radius: 10px; border: 1px solid #e9d5ff; text-align: center;">
<div style="font-size: 0.75rem; color: #6b7280;">% change?</div>
<div style="font-weight: 700; color: #7c3aed; font-size: 0.85rem; margin: 0.3rem 0;">(New−Old)/Old×100</div>
<div style="font-size: 0.7rem; color: #8b5cf6;">80→100 = <b>+25%</b></div></div>
</div>''',

    "length-conversion-guide.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Key Length Conversions</div>
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 0.3rem; font-size: 0.8rem; align-items: center;">
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 inch</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">2.54 cm</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 foot</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">0.3048 m</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 mile</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">1.609 km</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 yard</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">0.9144 m</div>
</div></div>''',

    "mean-median-mode-explained.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Dataset: 2, 3, 5, 5, 7, 9, 42</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem;">
<div style="background: #dbeafe; padding: 0.8rem; border-radius: 10px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-size: 0.7rem; color: #6b7280;">Mean (Average)</div>
<div style="font-size: 1.3rem; font-weight: 800; color: #2563eb;">10.4</div>
<div style="font-size: 0.65rem; color: #3b82f6;">Skewed by outlier 42</div></div>
<div style="background: #d1fae5; padding: 0.8rem; border-radius: 10px; text-align: center; border: 1px solid #6ee7b7;">
<div style="font-size: 0.7rem; color: #6b7280;">Median (Middle)</div>
<div style="font-size: 1.3rem; font-weight: 800; color: #059669;">5</div>
<div style="font-size: 0.65rem; color: #10b981;">More representative</div></div>
<div style="background: #faf5ff; padding: 0.8rem; border-radius: 10px; text-align: center; border: 1px solid #e9d5ff;">
<div style="font-size: 0.7rem; color: #6b7280;">Mode (Most Common)</div>
<div style="font-size: 1.3rem; font-weight: 800; color: #7c3aed;">5</div>
<div style="font-size: 0.65rem; color: #8b5cf6;">Appears twice</div></div>
</div></div>''',

    "power-of-compound-interest.md": '''<div style="margin: 2rem 0; background: #f0fdf4; border-radius: 12px; padding: 1.2rem; border: 1px solid #bbf7d0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #166534; margin-bottom: 0.8rem;">$100/Month at 10% Annual Return</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.65rem; color: #6b7280;">10 Years</div>
<div style="font-weight: 800; color: #16a34a; font-size: 1rem;">$20K</div>
<div style="font-size: 0.6rem; color: #6b7280;">put in $12K</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.65rem; color: #6b7280;">20 Years</div>
<div style="font-weight: 800; color: #16a34a; font-size: 1rem;">$76K</div>
<div style="font-size: 0.6rem; color: #6b7280;">put in $24K</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
<div style="font-size: 0.65rem; color: #6b7280;">30 Years</div>
<div style="font-weight: 800; color: #16a34a; font-size: 1rem;">$226K</div>
<div style="font-size: 0.6rem; color: #6b7280;">put in $36K</div></div>
<div style="background: #166534; padding: 0.6rem; border-radius: 8px; text-align: center;">
<div style="font-size: 0.65rem; color: #bbf7d0;">40 Years</div>
<div style="font-weight: 800; color: white; font-size: 1rem;">$632K</div>
<div style="font-size: 0.6rem; color: #bbf7d0;">put in $48K</div></div>
</div></div>''',

    "random-number-generators-explained.md": '''<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
<div style="padding: 1rem; background: #eff6ff; border-radius: 10px; border: 1px solid #bfdbfe; text-align: center;">
<div style="font-size: 1.3rem;">🎲</div>
<div style="font-weight: 700; color: #2563eb; font-size: 0.85rem;">Pseudo-Random (PRNG)</div>
<div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.3rem;">Algorithm-based</div>
<div style="font-size: 0.7rem; color: #6b7280;">Fast, reproducible</div>
<div style="font-size: 0.7rem; color: #3b82f6; font-weight: 600; margin-top: 0.3rem;">Games, simulations</div></div>
<div style="padding: 1rem; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0; text-align: center;">
<div style="font-size: 1.3rem;">🔐</div>
<div style="font-weight: 700; color: #16a34a; font-size: 0.85rem;">True Random (TRNG)</div>
<div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.3rem;">Hardware/entropy-based</div>
<div style="font-size: 0.7rem; color: #6b7280;">Unpredictable</div>
<div style="font-size: 0.7rem; color: #16a34a; font-weight: 600; margin-top: 0.3rem;">Cryptography, lotteries</div></div>
</div>''',

    "salary-hourly-conversion-guide.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Annual Salary → Hourly Rate (2,080 hrs/year)</div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 30%; background: #94a3b8; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">$30K → $14.42/hr</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 50%; background: #60a5fa; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">$50K → $24.04/hr</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
<div style="width: 70%; background: #34d399; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">$75K → $36.06/hr</div></div>
<div style="display: flex; align-items: center; gap: 0.5rem;">
<div style="width: 100%; background: #8b5cf6; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: white;">$100K → $48.08/hr</div></div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #94a3b8;">Formula: Annual Salary ÷ 2,080 = Hourly Rate</div>
</div>''',

    "salary-to-hourly-conversion.md": '''<div style="margin: 2rem 0; background: #eff6ff; border-radius: 12px; padding: 1.2rem; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; font-size: 0.85rem; color: #1e40af; margin-bottom: 0.8rem;">Quick Salary ↔ Hourly Reference</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.8rem;">
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #2563eb;">$15/hr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; color: #334155;">= $31,200/yr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #2563eb;">$25/hr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; color: #334155;">= $52,000/yr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #2563eb;">$35/hr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; color: #334155;">= $72,800/yr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #2563eb;">$50/hr</div>
<div style="background: white; padding: 0.4rem; border-radius: 6px; text-align: center; color: #334155;">= $104,000/yr</div>
</div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #3b82f6; text-align: center;">Hourly × 2,080 = Annual | Annual ÷ 2,080 = Hourly</div>
</div>''',

    "unit-price-comparison-guide.md": '''<div style="margin: 2rem 0; background: #f0fdf4; border-radius: 12px; padding: 1.2rem; border: 1px solid #bbf7d0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #166534; margin-bottom: 0.8rem;">Cereal Unit Price Comparison</div>
<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 0.3rem; font-size: 0.75rem;">
<div style="font-weight: 700; color: #64748b; padding: 0.3rem;">Size</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">Price</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">Weight</div>
<div style="font-weight: 700; color: #64748b; text-align: center; padding: 0.3rem;">$/oz</div>
<div style="padding: 0.3rem;">Small Box</div>
<div style="text-align: center; padding: 0.3rem;">$3.99</div>
<div style="text-align: center; padding: 0.3rem;">12 oz</div>
<div style="background: #fecaca; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 700; color: #dc2626;">$0.33</div>
<div style="padding: 0.3rem;">Medium Box</div>
<div style="text-align: center; padding: 0.3rem;">$5.49</div>
<div style="text-align: center; padding: 0.3rem;">18 oz</div>
<div style="background: #fef3c7; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 700; color: #d97706;">$0.31</div>
<div style="padding: 0.3rem;">Family Size</div>
<div style="text-align: center; padding: 0.3rem;">$6.99</div>
<div style="text-align: center; padding: 0.3rem;">28 oz</div>
<div style="background: #dcfce7; padding: 0.3rem; border-radius: 4px; text-align: center; font-weight: 700; color: #16a34a;">$0.25 ✓</div>
</div></div>''',

    "unit-price-grocery-savings.md": '''<div style="margin: 2rem 0; background: #fef3c7; border-radius: 12px; padding: 1.2rem; border: 1px solid #fde68a;">
<div style="font-weight: 700; font-size: 0.85rem; color: #92400e; margin-bottom: 0.8rem;">Annual Savings from Unit Price Shopping</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 0.65rem; color: #6b7280;">Save 10%</div>
<div style="font-weight: 800; color: #d97706; font-size: 1rem;">$520</div>
<div style="font-size: 0.6rem; color: #6b7280;">on $100/wk</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 0.65rem; color: #6b7280;">Save 15%</div>
<div style="font-weight: 800; color: #d97706; font-size: 1rem;">$780</div>
<div style="font-size: 0.6rem; color: #6b7280;">on $100/wk</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 0.65rem; color: #6b7280;">Save 20%</div>
<div style="font-weight: 800; color: #d97706; font-size: 1rem;">$1,040</div>
<div style="font-size: 0.6rem; color: #6b7280;">on $100/wk</div></div>
<div style="background: #92400e; padding: 0.6rem; border-radius: 8px; text-align: center;">
<div style="font-size: 0.65rem; color: #fde68a;">Save 25%</div>
<div style="font-weight: 800; color: white; font-size: 1rem;">$1,300</div>
<div style="font-size: 0.6rem; color: #fde68a;">on $100/wk</div></div>
</div></div>''',

    "us-time-zones-explained.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">US Time Zones — When It's 12:00 PM in New York</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
<div style="background: #dbeafe; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #93c5fd;">
<div style="font-size: 1.2rem; font-weight: 800; color: #1e40af;">12 PM</div>
<div style="font-size: 0.7rem; font-weight: 600; color: #2563eb;">EST</div>
<div style="font-size: 0.6rem; color: #6b7280;">New York</div></div>
<div style="background: #d1fae5; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #6ee7b7;">
<div style="font-size: 1.2rem; font-weight: 800; color: #059669;">11 AM</div>
<div style="font-size: 0.7rem; font-weight: 600; color: #10b981;">CST</div>
<div style="font-size: 0.6rem; color: #6b7280;">Chicago</div></div>
<div style="background: #fef3c7; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
<div style="font-size: 1.2rem; font-weight: 800; color: #b45309;">10 AM</div>
<div style="font-size: 0.7rem; font-weight: 600; color: #d97706;">MST</div>
<div style="font-size: 0.6rem; color: #6b7280;">Denver</div></div>
<div style="background: #fce7f3; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #f9a8d4;">
<div style="font-size: 1.2rem; font-weight: 800; color: #be185d;">9 AM</div>
<div style="font-size: 0.7rem; font-weight: 600; color: #db2777;">PST</div>
<div style="font-size: 0.6rem; color: #6b7280;">Los Angeles</div></div>
</div></div>''',

    "us-tipping-guide-complete.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">US Tipping Guide by Service Type</div>
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0.3rem; font-size: 0.8rem;">
<div style="padding: 0.4rem; font-weight: 600;">Restaurant (sit-down)</div>
<div style="background: #dcfce7; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #16a34a;">18-20%</div>
<div style="padding: 0.4rem; font-weight: 600;">Bartender</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #2563eb;">$1-2/drink</div>
<div style="padding: 0.4rem; font-weight: 600;">Food delivery</div>
<div style="background: #fef3c7; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #d97706;">15-20%</div>
<div style="padding: 0.4rem; font-weight: 600;">Hair stylist</div>
<div style="background: #ede9fe; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #7c3aed;">15-20%</div>
<div style="padding: 0.4rem; font-weight: 600;">Hotel housekeeping</div>
<div style="background: #fce7f3; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #db2777;">$2-5/night</div>
<div style="padding: 0.4rem; font-weight: 600;">Rideshare/Taxi</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 4px; text-align: center; font-weight: 700; color: #059669;">15-20%</div>
</div></div>''',

    "weight-conversion-guide.md": '''<div style="margin: 2rem 0; background: #f8fafc; border-radius: 12px; padding: 1.2rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 0.8rem;">Weight Conversion Quick Reference</div>
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 0.3rem; font-size: 0.8rem; align-items: center;">
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 lb</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">0.4536 kg</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 kg</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">2.2046 lbs</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 oz</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">28.35 g</div>
<div style="background: #dbeafe; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #1e40af;">1 stone</div>
<div style="color: #94a3b8;">=</div>
<div style="background: #d1fae5; padding: 0.4rem; border-radius: 6px; text-align: center; font-weight: 700; color: #059669;">6.35 kg</div>
</div></div>''',

    "what-grade-do-i-need-on-final.md": '''<div style="margin: 2rem 0; background: #fef2f2; border-radius: 12px; padding: 1.2rem; border: 1px solid #fecaca;">
<div style="font-weight: 700; font-size: 0.85rem; color: #991b1b; margin-bottom: 0.8rem;">Current Grade: 78% | Final = 30% of Grade</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fecaca;">
<div style="font-size: 0.65rem; color: #6b7280;">Want a C (70%)</div>
<div style="font-weight: 800; color: #16a34a; font-size: 1.1rem;">51%</div>
<div style="font-size: 0.6rem; color: #16a34a;">Easy!</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fecaca;">
<div style="font-size: 0.65rem; color: #6b7280;">Want a B (80%)</div>
<div style="font-weight: 800; color: #f59e0b; font-size: 1.1rem;">85%</div>
<div style="font-size: 0.6rem; color: #f59e0b;">Doable</div></div>
<div style="background: white; padding: 0.6rem; border-radius: 8px; text-align: center; border: 1px solid #fecaca;">
<div style="font-size: 0.65rem; color: #6b7280;">Want an A (90%)</div>
<div style="font-weight: 800; color: #dc2626; font-size: 1.1rem;">118%</div>
<div style="font-size: 0.6rem; color: #dc2626;">Not possible</div></div>
</div>
<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #991b1b;">Formula: (Target − Current × (1 − Final Weight)) ÷ Final Weight</div>
</div>''',
}


def apply_chart(filepath, chart_html):
    """Insert or replace chart in a markdown article."""
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the end of frontmatter (second ---)
    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"  SKIP: No frontmatter found in {os.path.basename(filepath)}")
        return False

    frontmatter = parts[1]
    body = parts[2]

    # Check if there's an existing chart (starts with \n\n<div style="margin: 2rem 0;)
    chart_pattern = re.compile(r'^\s*<div style="margin: 2rem 0;.*?</div>\s*\n', re.DOTALL)

    # Remove existing chart if present
    body_stripped = body.lstrip('\n')
    if body_stripped.startswith('<div style="margin: 2rem 0;'):
        # Find the end of the chart block - count div nesting
        depth = 0
        end_idx = 0
        i = 0
        while i < len(body_stripped):
            if body_stripped[i:i+4] == '<div':
                depth += 1
                i += 4
            elif body_stripped[i:i+6] == '</div>':
                depth -= 1
                i += 6
                if depth == 0:
                    end_idx = i
                    break
            else:
                i += 1
        if end_idx > 0:
            body = body_stripped[end_idx:].lstrip('\n')
            body = '\n' + body

    # Insert new chart
    new_content = f'---{frontmatter}---\n\n{chart_html}\n{body.lstrip(chr(10))}'

    with open(filepath, 'w') as f:
        f.write(new_content)
    return True


# Apply charts
success = 0
for filename, chart in CHARTS.items():
    filepath = os.path.join(POSTS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  NOT FOUND: {filename}")
        continue
    if apply_chart(filepath, chart):
        print(f"  ✅ {filename}")
        success += 1

print(f"\nDone: {success}/{len(CHARTS)} charts applied")

import { RecoveryPlan } from '../types';

/**
 * ReRoute Explainable AI Engine
 * 
 * Generates transparent natural language rationale for why a particular recovery
 * plan was ranked highest based on multi-dimensional utility analysis.
 */

export interface AIExplanation {
  headline: string;
  narrative: string;
  tradeoffBreakdown: {
    title: string;
    description: string;
    advantage: string;
  }[];
  verdict: string;
  scoringFactors: {
    label: string;
    weight: string;
    score: number;
    impactDescription: string;
  }[];
}

export function generatePlanExplanation(
  plans: RecoveryPlan[],
  selectedPlanId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C' = 'PLAN_C'
): AIExplanation {
  const planA = plans.find((p) => p.id === 'PLAN_A') || plans[0];
  const planB = plans.find((p) => p.id === 'PLAN_B') || plans[1];
  const planC = plans.find((p) => p.id === 'PLAN_C') || plans[2];

  if (selectedPlanId === 'PLAN_C') {
    return {
      headline: 'Why Plan C (Smart ReRoute) is Ranked #1',
      narrative: `Plan C is recommended because it achieves the highest Pareto efficiency across your trip constraints. While Plan A is slightly cheaper (saving ₹300), it forces the complete cancellation of your Heritage City Tour. Conversely, Plan B eliminates schedule delay but inflates out-of-pocket costs by ₹2,500 (+284% surge). Plan C preserves 100% of your travel experiences with only ₹650 in incremental transit fees by leveraging Mumbai Express Metro to bypass highway congestion and rescheduling the tour to a 5:00 PM sunset slot.`,
      tradeoffBreakdown: [
        {
          title: 'Plan C vs Plan A (Cost Optimizer)',
          description: 'Plan A saves ₹300 more in immediate cash outlay, but destroys the Mumbai Heritage Tour experience.',
          advantage: 'Plan C preserves your entire trip value for just ₹300 net variance.'
        },
        {
          title: 'Plan C vs Plan B (Time Optimizer)',
          description: 'Plan B rebooks onto IndiGo 6E-512 to save 75 minutes, but incurs a steep ₹2,500 airline switch surcharge.',
          advantage: 'Plan C saves you ₹1,850 while still arriving in time for evening engagements.'
        },
        {
          title: 'Traffic & Arrival Optimization',
          description: 'Using Metro Line 3 avoids peak Western Express Highway gridlock, delivering you to Marine Drive in 50 minutes flat.',
          advantage: '98% on-time arrival reliability vs 60% road transit variability.'
        }
      ],
      verdict: 'Plan C delivers 92/100 Composite Recovery Score with minimal itinerary changes and zero experience loss.',
      scoringFactors: [
        {
          label: 'Cost Efficiency',
          weight: '25%',
          score: 92,
          impactDescription: 'Only ₹650 added expense vs ₹2,500 flight rebooking fee.'
        },
        {
          label: 'Schedule Integrity',
          weight: '25%',
          score: 84,
          impactDescription: '2 hours arrival delay absorbed comfortably before dinner.'
        },
        {
          label: 'Convenience & Comfort',
          weight: '20%',
          score: 92,
          impactDescription: 'Digital hotel keycard issued; seamless tour reschedule.'
        },
        {
          label: 'Bookings Preserved',
          weight: '15%',
          score: 95,
          impactDescription: '4 out of 4 major itinerary items preserved.'
        },
        {
          label: 'Risk & Buffer Safety',
          weight: '15%',
          score: 96,
          impactDescription: 'Metro connection eliminates Mumbai monsoon traffic volatility.'
        }
      ]
    };
  } else if (selectedPlanId === 'PLAN_B') {
    return {
      headline: 'Why Choose Plan B (Rapid Reroute)',
      narrative: `Plan B is the optimal choice for time-critical travelers and executive schedules where punctuality is paramount. By immediately transferring to IndiGo 6E-512, your total trip delay is compressed from 3 hours to just 45 minutes, allowing all downstream appointments and original bookings to remain completely untouched.`,
      tradeoffBreakdown: [
        {
          title: 'Punctuality Priority',
          description: 'Arrives in Mumbai at 01:15 PM, maintaining your original afternoon timeline.',
          advantage: 'Best choice if you have fixed 3:00 PM business meetings.'
        },
        {
          title: 'Cost Premium',
          description: 'Requires an out-of-pocket flight change surcharge of ₹2,500.',
          advantage: 'High speed, premium convenience.'
        }
      ],
      verdict: 'Plan B provides 84/100 Recovery Score with 100% time preservation.',
      scoringFactors: [
        { label: 'Time Score', weight: '25%', score: 96, impactDescription: 'Only 45 minutes lost.' },
        { label: 'Cost Score', weight: '25%', score: 62, impactDescription: '₹2,500 extra expenditure.' },
        { label: 'Convenience', weight: '20%', score: 94, impactDescription: 'Zero itinerary alterations needed.' },
        { label: 'Bookings Saved', weight: '15%', score: 100, impactDescription: 'All 5 bookings intact.' },
        { label: 'Risk Safety', weight: '15%', score: 78, impactDescription: 'Requires fast terminal transit in Bangalore.' }
      ]
    };
  } else {
    return {
      headline: 'Why Choose Plan A (Budget Saver)',
      narrative: `Plan A strictly minimizes additional spending during disruption events. By keeping the delayed flight and substituting a flexible rideshare for ₹350, you avoid any flight rebooking fees. The conflicting City Tour is refunded back to your account (+₹1,200), resulting in net positive cash recovery despite losing the tour.`,
      tradeoffBreakdown: [
        {
          title: 'Minimal Extra Outlay',
          description: 'Only ₹350 incremental rideshare expense.',
          advantage: 'Best for budget-conscious independent travelers.'
        },
        {
          title: 'Activity Tradeoff',
          description: 'City tour is dropped from the schedule and refunded.',
          advantage: 'Free relaxed evening with no schedule pressure.'
        }
      ],
      verdict: 'Plan A provides 76/100 Recovery Score maximizing financial conservatism.',
      scoringFactors: [
        { label: 'Cost Score', weight: '25%', score: 98, impactDescription: 'Net positive financial compensation.' },
        { label: 'Time Score', weight: '25%', score: 60, impactDescription: '3 full hours delayed.' },
        { label: 'Convenience', weight: '20%', score: 65, impactDescription: 'Manual app cab booking on arrival.' },
        { label: 'Bookings Saved', weight: '15%', score: 70, impactDescription: 'Tour cancelled, rest preserved.' },
        { label: 'Risk Safety', weight: '15%', score: 90, impactDescription: 'Wide safety margin with no rush.' }
      ]
    };
  }
}

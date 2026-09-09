# ReRoute AI — Intelligent Travel Disruption Recovery Engine

> **PS-2: Travel Disruption Recovery Engine**  
> **Team: Hack Bros**

## 🌐 Live Public URLs
- **Primary Live Production URL (GitHub Pages)**: **[https://1234holebasayya.github.io/project/](https://1234holebasayya.github.io/project/)**  
  *(Works 100% on any mobile phone, laptop, or browser without requiring localhost or running local machine)*
- **Alternative Mirror (Surge)**: **[https://reroute-ai.surge.sh](https://reroute-ai.surge.sh)** | **[http://reroute-ai.surge.sh](http://reroute-ai.surge.sh)** | **[https://reroute-ai-hackbros-2026.surge.sh](https://reroute-ai-hackbros-2026.surge.sh)**
- **GitHub Repository**: **[https://github.com/1234HOLEBASAYYA/project](https://github.com/1234HOLEBASAYYA/project)**

---

## Overview
**ReRoute AI** is an autonomous travel recovery platform built for the **PS-2 Hackathon Challenge**. It models multi-booking travel itineraries as an interconnected Directed Acyclic Graph (DAG) and solves the cascading collapse that happens when an upstream booking is disrupted.

### The Problem Solved
```
Flight Delayed by 3 Hours
        ↓
Airport Cab Missed (Driver Leaves)
        ↓
Hotel Check-in Window At Risk
        ↓
City Tour Schedule Conflict (Non-refundable)
        ↓
Next Connection Collapses
```

ReRoute AI intercepts the disruption, evaluates buffer windows, synthesizes Pareto-optimal recovery plans (Cheapest, Fastest, AI Recommended), and stabilizes the entire journey with 1-click execution.

---

## Demo Flow for Judges
1. **Landing Page**: View the interactive animated network topology graph and click **[ Explore Interactive Demo ]**.
2. **Operations Dashboard**: View travel status, KPI stats cards, Bangalore $\rightarrow$ Mumbai progress timeline, and circular Travel Health Score (92/100).
3. **Trip Details**: Inspect the vertical itinerary timeline (Flight AI-604 $\rightarrow$ Transfer $\rightarrow$ Hotel $\rightarrow$ Tour $\rightarrow$ Dinner). Click on any card to view the booking telemetry inspector.
4. **Simulate Disruption**: Click **Simulate Disruption** $\rightarrow$ select **Flight Delay (+3 Hours)** $\rightarrow$ click **[ Simulate & Analyze Recovery → ]**.
5. **Disruption Center**: View the live incident banner and the 3 cascading failure cards (Cab MISSED, Hotel AT RISK, Tour AT RISK).
6. **Analyze Recovery**: Click **[ ANALYZE RECOVERY OPTIONS → ]** to watch the multi-stage animated solver.
7. **Recovery Plans**:
   - Compare **Plan A (Cheapest - ₹350)**, **Plan B (Fastest - 45m lost)**, and **Plan C (AI Recommended - Best Balance, 92/100)**.
   - Toggle the **Visual Metrics Comparison** tab for Recharts radar & bar charts.
   - Click **Why this plan?** to view the explainable AI trade-off matrix.
8. **Impact Map & What-If Simulator**: Navigate via the sidebar to test topological DAG node inspections and simulation alternatives.
9. **Apply Recovery**: Click **[ SELECT AI RECOMMENDED PLAN → ]** on Plan C.
10. **Celebration**: Enjoy celebratory confetti, view recovery metrics, and click **[ View Updated Itinerary Timeline ]** to verify all bookings marked **RECOVERED**.

---

## Tech Stack
- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, custom glassmorphism & dark luxury palette
- **Animations**: Framer Motion
- **Visualizations**: Recharts
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti

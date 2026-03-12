import { useState, useEffect } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

const DEFAULT_PLANS = {
  1: {
    Mon: {
      Breakfast: { name: "Oats + banana + peanut butter", time: "5 min", cost: 1.2 },
      Lunch: { name: "Chicken + rice + roasted broccoli", time: "20 min", cost: 3.5 },
      Dinner: { name: "Pasta with marinara + ground beef", time: "25 min", cost: 4.0 },
    },
    Tue: {
      Breakfast: { name: "Scrambled eggs + toast + avocado", time: "10 min", cost: 1.8 },
      Lunch: { name: "Leftover pasta + side salad", time: "5 min", cost: 1.5 },
      Dinner: { name: "Sheet pan salmon + sweet potato", time: "30 min", cost: 5.5 },
    },
    Wed: {
      Breakfast: { name: "Greek yogurt + granola + berries", time: "3 min", cost: 2.0 },
      Lunch: { name: "Turkey + cheese wrap + apple", time: "5 min", cost: 2.8 },
      Dinner: { name: "Chicken stir-fry + rice noodles", time: "20 min", cost: 4.2 },
    },
    Thu: {
      Breakfast: { name: "Smoothie: spinach, banana, almond milk", time: "5 min", cost: 1.5 },
      Lunch: { name: "Leftover stir-fry + steamed rice", time: "5 min", cost: 1.0 },
      Dinner: { name: "Black bean tacos + salsa + cheese", time: "15 min", cost: 3.0 },
    },
    Fri: {
      Breakfast: { name: "Whole wheat pancakes + maple syrup", time: "15 min", cost: 1.2 },
      Lunch: { name: "Egg salad sandwich + carrot sticks", time: "10 min", cost: 2.2 },
      Dinner: { name: "Homemade pizza + garden salad", time: "35 min", cost: 5.0 },
    },
    Sat: {
      Breakfast: { name: "Veggie omelette + sourdough toast", time: "15 min", cost: 2.5 },
      Lunch: { name: "Grilled cheese + tomato soup", time: "15 min", cost: 2.8 },
      Dinner: { name: "BBQ chicken thighs + corn + coleslaw", time: "40 min", cost: 5.2 },
    },
    Sun: {
      Breakfast: { name: "French toast + fresh fruit", time: "15 min", cost: 2.0 },
      Lunch: { name: "Loaded baked potato + greek salad", time: "20 min", cost: 3.0 },
      Dinner: { name: "Slow cooker beef stew + crusty bread", time: "10 min active", cost: 6.0 },
    },
  },
  2: {
    Mon: {
      Breakfast: { name: "Chia pudding + mango", time: "5 min", cost: 1.8 },
      Lunch: { name: "Lentil soup + whole grain bread", time: "5 min", cost: 2.0 },
      Dinner: { name: "Shrimp + zucchini + orzo pasta", time: "20 min", cost: 5.0 },
    },
    Tue: {
      Breakfast: { name: "Cottage cheese + pineapple + flaxseed", time: "3 min", cost: 1.5 },
      Lunch: { name: "Leftover shrimp orzo", time: "5 min", cost: 1.0 },
      Dinner: { name: "Turkey meatballs + spaghetti squash", time: "35 min", cost: 4.5 },
    },
    Wed: {
      Breakfast: { name: "Avocado toast + poached egg", time: "10 min", cost: 2.2 },
      Lunch: { name: "Chickpea + cucumber + feta salad", time: "5 min", cost: 2.5 },
      Dinner: { name: "Pork tenderloin + roasted potatoes + green beans", time: "35 min", cost: 5.5 },
    },
    Thu: {
      Breakfast: { name: "Overnight oats with nut butter", time: "3 min", cost: 1.3 },
      Lunch: { name: "Pork + veggie rice bowl", time: "5 min", cost: 2.0 },
      Dinner: { name: "Vegetable curry + basmati rice + naan", time: "25 min", cost: 3.5 },
    },
    Fri: {
      Breakfast: { name: "Banana oat muffins (batch baked)", time: "3 min", cost: 0.8 },
      Lunch: { name: "BLT on whole wheat + tomato bisque", time: "10 min", cost: 3.0 },
      Dinner: { name: "Cod fish tacos + mango salsa + slaw", time: "25 min", cost: 5.0 },
    },
    Sat: {
      Breakfast: { name: "Shakshuka + crusty bread", time: "20 min", cost: 2.5 },
      Lunch: { name: "Cobb salad + balsamic vinaigrette", time: "10 min", cost: 3.5 },
      Dinner: { name: "Lamb chops + roasted root vegetables", time: "35 min", cost: 7.0 },
    },
    Sun: {
      Breakfast: { name: "Waffles + whipped cream + strawberries", time: "20 min", cost: 2.0 },
      Lunch: { name: "Caprese panini + minestrone", time: "15 min", cost: 3.2 },
      Dinner: { name: "Roast chicken + mashed potato + asparagus", time: "15 min active", cost: 6.5 },
    },
  },
  3: {
    Mon: {
      Breakfast: { name: "Protein smoothie bowl + granola", time: "8 min", cost: 2.0 },
      Lunch: { name: "Quinoa + black bean + corn bowl", time: "5 min", cost: 2.5 },
      Dinner: { name: "Baked teriyaki salmon + edamame + rice", time: "25 min", cost: 5.5 },
    },
    Tue: {
      Breakfast: { name: "Whole grain waffles + almond butter", time: "8 min", cost: 1.5 },
      Lunch: { name: "Leftover salmon rice bowl + sesame dressing", time: "5 min", cost: 1.2 },
      Dinner: { name: "Chicken enchiladas + refried beans", time: "30 min", cost: 4.5 },
    },
    Wed: {
      Breakfast: { name: "Two-egg omelette + spinach + feta", time: "10 min", cost: 2.0 },
      Lunch: { name: "Chicken tortilla soup", time: "5 min", cost: 2.2 },
      Dinner: { name: "Pesto gnocchi + cherry tomatoes + parmesan", time: "20 min", cost: 4.0 },
    },
    Thu: {
      Breakfast: { name: "Ricotta toast + honey + walnuts", time: "5 min", cost: 2.0 },
      Lunch: { name: "Leftover gnocchi + arugula salad", time: "5 min", cost: 1.0 },
      Dinner: { name: "Beef + broccoli stir-fry + jasmine rice", time: "20 min", cost: 4.5 },
    },
    Fri: {
      Breakfast: { name: "Yogurt parfait + granola + honey", time: "3 min", cost: 2.0 },
      Lunch: { name: "Caprese sandwich + minestrone soup", time: "10 min", cost: 3.0 },
      Dinner: { name: "Shrimp fried rice + spring rolls", time: "25 min", cost: 5.0 },
    },
    Sat: {
      Breakfast: { name: "Sourdough French toast + bacon + berries", time: "20 min", cost: 3.5 },
      Lunch: { name: "Mediterranean mezze bowl + hummus", time: "10 min", cost: 3.5 },
      Dinner: { name: "Grilled ribeye + garlic green beans + rolls", time: "30 min", cost: 8.5 },
    },
    Sun: {
      Breakfast: { name: "Eggs Benedict + roasted potatoes", time: "25 min", cost: 3.5 },
      Lunch: { name: "Butternut squash soup + crusty bread", time: "15 min", cost: 3.0 },
      Dinner: { name: "Braised pork shoulder + apple slaw + cornbread", time: "15 min active", cost: 6.0 },
    },
  },
  4: {
    Mon: {
      Breakfast: { name: "Steel cut oats + dried cranberries + almonds", time: "5 min", cost: 1.2 },
      Lunch: { name: "Tuscan white bean + kale soup", time: "5 min", cost: 2.0 },
      Dinner: { name: "Lemon herb chicken + couscous + spinach", time: "25 min", cost: 4.5 },
    },
    Tue: {
      Breakfast: { name: "Multigrain toast + smoked salmon + cream cheese", time: "5 min", cost: 3.0 },
      Lunch: { name: "Leftover chicken couscous bowl", time: "5 min", cost: 1.0 },
      Dinner: { name: "Vegetable frittata + mixed green salad", time: "25 min", cost: 3.5 },
    },
    Wed: {
      Breakfast: { name: "Blueberry protein smoothie", time: "5 min", cost: 1.8 },
      Lunch: { name: "Frittata slice + roasted veggie wrap", time: "5 min", cost: 2.0 },
      Dinner: { name: "Honey garlic pork chops + mashed cauliflower", time: "30 min", cost: 5.0 },
    },
    Thu: {
      Breakfast: { name: "Baked egg cups + whole grain toast", time: "20 min", cost: 2.0 },
      Lunch: { name: "Tuna + avocado rice cake stack", time: "5 min", cost: 2.5 },
      Dinner: { name: "Spicy Thai peanut noodles + tofu", time: "20 min", cost: 3.5 },
    },
    Fri: {
      Breakfast: { name: "Cinnamon roll overnight oats", time: "3 min", cost: 1.3 },
      Lunch: { name: "Chicken Caesar wrap + side fruit", time: "10 min", cost: 3.0 },
      Dinner: { name: "Fish and chips + mushy peas + tartar sauce", time: "30 min", cost: 5.5 },
    },
    Sat: {
      Breakfast: { name: "Smashed avo + dukkah + poached eggs", time: "15 min", cost: 3.0 },
      Lunch: { name: "Gourmet grilled cheese + roasted tomato soup", time: "15 min", cost: 3.2 },
      Dinner: { name: "Surf & turf: filet + garlic butter shrimp + fries", time: "35 min", cost: 9.5 },
    },
    Sun: {
      Breakfast: { name: "Banana pancakes + maple + fresh berries", time: "15 min", cost: 2.0 },
      Lunch: { name: "Roast beef + horseradish + Swiss sandwich", time: "5 min", cost: 3.5 },
      Dinner: { name: "Sunday pot roast + Yorkshire pudding + veg", time: "20 min active", cost: 7.0 },
    },
  },
};

const GROCERY_ITEMS = {
  1: ["Rolled oats", "Bananas (6)", "Peanut butter", "Chicken breast (2 lbs)", "Jasmine rice (2 lbs)", "Broccoli (1 head)", "Ground beef (1 lb)", "Pasta (2 lbs)", "Marinara sauce (jar)", "Eggs (18)", "Sourdough bread", "Avocados (3)", "Greek yogurt (32oz)", "Granola", "Mixed berries (2 cups)", "Turkey slices", "Cheddar cheese", "Wraps (pkg)", "Salmon fillets (2)", "Sweet potatoes (4)", "Spinach (bag)", "Almond milk", "Black beans (2 cans)", "Salsa", "Shredded cheese", "Pancake mix", "Maple syrup", "Carrots", "Homemade pizza dough / store-bought", "Mozzarella", "Chicken thighs (4)", "Corn on cob (2)", "Coleslaw mix", "French bread", "Beef stew meat (1.5 lbs)", "Potatoes (5 lbs)"],
  2: ["Chia seeds", "Mango (2)", "Canned lentils (2)", "Whole grain bread", "Shrimp (1 lb)", "Zucchini (2)", "Orzo pasta", "Cottage cheese", "Pineapple chunks", "Flaxseed", "Turkey (ground, 1 lb)", "Spaghetti squash", "Feta cheese", "Chickpeas (can)", "English cucumbers", "Pork tenderloin", "Green beans", "Banana oat muffin mix / ingredients", "Bacon", "Lettuce", "Tomatoes (4)", "Cod fillets (2)", "Naan bread", "Coconut milk", "Curry paste", "Basmati rice", "Eggs (dozen)", "Crushed tomatoes (can)", "Bell peppers", "Lamb chops (4)", "Root vegetables (parsnips, turnips)", "Chicken whole (4–5 lbs)", "Asparagus", "Waffle mix"],
  3: ["Protein powder", "Mixed frozen fruit", "Quinoa", "Edamame (frozen)", "Teriyaki sauce", "Chicken breast (2 lbs)", "Enchilada sauce", "Tortillas (pkg)", "Refried beans", "Eggs (18)", "Gnocchi (pkg)", "Pesto jar", "Cherry tomatoes", "Parmesan", "Arugula", "Beef sirloin (1 lb)", "Broccoli florets", "Ricotta", "Honey", "Walnuts", "Granola", "Greek yogurt", "Spring roll wrappers", "Shrimp (1 lb)", "Fried rice veggies", "Soy sauce", "Sourdough loaf", "Ribeye steak (2)", "Garlic", "Butternut squash", "Pork shoulder (2 lbs)", "Cornbread mix", "Apple", "Cabbage"],
  4: ["Steel cut oats", "Dried cranberries", "Slivered almonds", "Canned white beans", "Kale", "Chicken thighs (bone-in)", "Couscous", "Smoked salmon (4 oz)", "Cream cheese", "Tuna (cans)", "Rice cakes", "Cauliflower head", "Pork chops (4)", "Tofu (firm)", "Peanut butter", "Rice noodles", "Fish fillets for fish&chips", "Frozen peas", "Tartar sauce", "Eggs (18)", "Dukkah spice blend", "Canned tomatoes (crushed)", "Beef tenderloin filets (2)", "Shrimp (1 lb)", "Russet potatoes", "Pancake mix", "Maple syrup", "Berries (fresh)", "Roast beef deli slices", "Horseradish", "Swiss cheese", "Chuck roast (3 lbs)", "Yorkshire pudding mix", "Mixed veg (frozen)", "Bananas (6)"],
};

const MEAL_COLORS = {
  Breakfast: { bg: "#FFF3E0", accent: "#FF8F00", dot: "#FFB300" },
  Lunch: { bg: "#E8F5E9", accent: "#2E7D32", dot: "#43A047" },
  Dinner: { bg: "#EDE7F6", accent: "#4527A0", dot: "#7B1FA2" },
};

export default function MealPlanner() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeView, setActiveView] = useState("planner"); // planner | grocery | pantry | tracker
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [pantry, setPantry] = useState([]);
  const [pantryInput, setPantryInput] = useState("");
  const [wasteLog, setWasteLog] = useState([]);
  const [wasteInput, setWasteInput] = useState("");
  const [budget, setBudget] = useState(130);
  const [addingWaste, setAddingWaste] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const weekCost = () => {
    let total = 0;
    const weekPlan = plans[activeWeek];
    DAYS.forEach((d) => MEALS.forEach((m) => { total += weekPlan[d]?.[m]?.cost || 0; }));
    return total.toFixed(2);
  };

  const toggleGrocery = (item) => {
    setCheckedItems((prev) => ({ ...prev, [`${activeWeek}-${item}`]: !prev[`${activeWeek}-${item}`] }));
  };

  const startEdit = (day, meal) => {
    setEditing({ day, meal });
    setEditValue(plans[activeWeek][day][meal].name);
  };

  const saveEdit = () => {
    if (!editing) return;
    setPlans((prev) => ({
      ...prev,
      [activeWeek]: {
        ...prev[activeWeek],
        [editing.day]: {
          ...prev[activeWeek][editing.day],
          [editing.meal]: { ...prev[activeWeek][editing.day][editing.meal], name: editValue },
        },
      },
    }));
    setEditing(null);
    showToast("Meal updated ✓");
  };

  const addPantry = () => {
    if (!pantryInput.trim()) return;
    setPantry((p) => [...p, { name: pantryInput.trim(), id: Date.now() }]);
    setPantryInput("");
  };

  const removePantry = (id) => setPantry((p) => p.filter((x) => x.id !== id));

  const totalWaste = wasteLog.reduce((s, w) => s + parseFloat(w.cost || 0), 0).toFixed(2);

  const budgetPct = Math.min((parseFloat(weekCost()) / budget) * 100, 100);
  const budgetColor = budgetPct > 90 ? "#e53935" : budgetPct > 75 ? "#FB8C00" : "#43A047";

  return (
    <div style={{ fontFamily: "'DM Sans', 'Georgia', sans-serif", minHeight: "100vh", background: "#FAFAF7", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f0f0ea; } ::-webkit-scrollbar-thumb { background: #c5c5b0; border-radius: 3px; }
        .meal-card { transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; }
        .meal-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.09) !important; }
        .week-btn { transition: all 0.2s; }
        .week-btn:hover { opacity: 0.85; }
        .nav-btn { transition: all 0.18s; }
        .nav-btn:hover { background: rgba(0,0,0,0.06) !important; }
        .grocery-item { transition: opacity 0.2s; }
        .edit-input { outline: none; border: none; font-family: inherit; font-size: 13px; width: 100%; background: transparent; }
        .pantry-tag { animation: fadeIn 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .toast { animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        textarea:focus, input:focus { outline: 2px solid #8B6F47; outline-offset: 1px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#1C1C1A", color: "#F5F0E8", padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, letterSpacing: "-0.5px", lineHeight: 1 }}>🥦 MealFlow</div>
          <div style={{ fontSize: 12, color: "#9A9480", marginTop: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>4-Week Rotating Meal System</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["planner", "grocery", "pantry", "tracker"].map((v) => (
            <button key={v} className="nav-btn" onClick={() => setActiveView(v)} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 500, background: activeView === v ? "#D4A853" : "rgba(255,255,255,0.08)", color: activeView === v ? "#1C1C1A" : "#C8BEA8", letterSpacing: "0.3px" }}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Week Selector */}
      <div style={{ background: "#F0EDE4", borderBottom: "1px solid #E5E0D4", padding: "12px 24px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#6B5E45", textTransform: "uppercase", letterSpacing: "0.8px", marginRight: 4 }}>Week</span>
        {[1, 2, 3, 4].map((w) => (
          <button key={w} className="week-btn" onClick={() => setActiveWeek(w)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, background: activeWeek === w ? "#1C1C1A" : "#DEDAD0", color: activeWeek === w ? "#F5F0E8" : "#5C5040" }}>
            {w}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#7A6E5A" }}>Est. weekly cost:</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: budgetColor }}>${weekCost()}</span>
          <span style={{ fontSize: 12, color: "#7A6E5A" }}>/</span>
          <input type="number" value={budget} onChange={(e) => setBudget(parseInt(e.target.value) || 130)} style={{ width: 56, fontSize: 13, fontWeight: 600, border: "1px solid #D0C9BB", borderRadius: 6, padding: "3px 6px", fontFamily: "inherit", background: "#FFF", color: "#1C1C1A", textAlign: "center" }} />
          <span style={{ fontSize: 12, color: "#7A6E5A" }}>budget</span>
        </div>
      </div>

      {/* Budget Bar */}
      <div style={{ height: 5, background: "#E5E0D4" }}>
        <div style={{ height: "100%", width: `${budgetPct}%`, background: budgetColor, transition: "width 0.5s, background 0.3s", borderRadius: "0 3px 3px 0" }} />
      </div>

      {/* Main Content */}
      <div style={{ padding: "24px 20px", maxWidth: 1200, margin: "0 auto" }}>

        {/* PLANNER VIEW */}
        {activeView === "planner" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
              {DAYS.map((day) => (
                <div key={day}>
                  <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#8B7E68", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8, padding: "5px 0", borderBottom: "2px solid #E5DFD0" }}>{day}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {MEALS.map((meal) => {
                      const item = plans[activeWeek]?.[day]?.[meal];
                      const c = MEAL_COLORS[meal];
                      const isEd = editing?.day === day && editing?.meal === meal;
                      return (
                        <div key={meal} className="meal-card" onClick={() => !isEd && startEdit(day, meal)} style={{ background: c.bg, borderRadius: 10, padding: "10px 10px 8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${c.accent}18`, position: "relative", minHeight: 82 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: c.accent, textTransform: "uppercase", letterSpacing: "0.6px" }}>{meal}</span>
                          </div>
                          {isEd ? (
                            <div>
                              <textarea className="edit-input" value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ resize: "none", fontSize: 12, lineHeight: 1.4, height: 52, borderRadius: 4, padding: 2, background: "rgba(255,255,255,0.7)" }} autoFocus onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); saveEdit(); } if (e.key === "Escape") setEditing(null); }} />
                              <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
                                <button onClick={(e) => { e.stopPropagation(); saveEdit(); }} style={{ flex: 1, fontSize: 10, padding: "3px 0", background: c.accent, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Save</button>
                                <button onClick={(e) => { e.stopPropagation(); setEditing(null); }} style={{ flex: 1, fontSize: 10, padding: "3px 0", background: "#E0DDD4", color: "#555", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div style={{ fontSize: 12, lineHeight: 1.4, color: "#2a2a2a", fontWeight: 500 }}>{item?.name}</div>
                              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                <span style={{ fontSize: 10, color: "#888" }}>⏱ {item?.time}</span>
                                <span style={{ fontSize: 10, fontWeight: 600, color: c.accent }}>${item?.cost?.toFixed(2)}</span>
                              </div>
                              <div style={{ position: "absolute", top: 7, right: 8, fontSize: 9, color: "#bbb", opacity: 0 }} className="edit-hint">✎</div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: "#9A9080", textAlign: "center" }}>
              💡 Click any meal card to edit it. Press Enter to save.
            </div>
          </div>
        )}

        {/* GROCERY VIEW */}
        {activeView === "grocery" && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>Week {activeWeek} Grocery List</h2>
                <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>
                  {GROCERY_ITEMS[activeWeek].filter((item) => checkedItems[`${activeWeek}-${item}`]).length} / {GROCERY_ITEMS[activeWeek].length} items checked
                </div>
              </div>
              <button onClick={() => { const reset = {}; GROCERY_ITEMS[activeWeek].forEach((i) => (reset[`${activeWeek}-${i}`] = false)); setCheckedItems((p) => ({ ...p, ...reset })); showToast("List reset"); }} style={{ fontSize: 12, padding: "7px 14px", background: "#F0EDE4", border: "1px solid #D8D2C4", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", color: "#5C5040", fontWeight: 500 }}>
                Reset
              </button>
            </div>
            <div style={{ background: "#FFF", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E0D4", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {GROCERY_ITEMS[activeWeek].map((item, i) => {
                const key = `${activeWeek}-${item}`;
                const checked = checkedItems[key];
                const inPantry = pantry.some((p) => p.name.toLowerCase() === item.toLowerCase());
                return (
                  <div key={item} className="grocery-item" onClick={() => toggleGrocery(item)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", cursor: "pointer", borderBottom: i < GROCERY_ITEMS[activeWeek].length - 1 ? "1px solid #F0EDE4" : "none", background: checked ? "#F9F9F4" : inPantry ? "#F0FAF0" : "#FFF", opacity: checked ? 0.55 : 1, transition: "all 0.15s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: checked ? "none" : "2px solid #C8C0B0", background: checked ? "#43A047" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {checked && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 14, flex: 1, textDecoration: checked ? "line-through" : "none", color: checked ? "#999" : "#2a2a2a", fontWeight: 400 }}>{item}</span>
                    {inPantry && !checked && <span style={{ fontSize: 10, background: "#E8F5E9", color: "#2E7D32", padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>In Pantry</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, fontSize: 12, color: "#9A9080", textAlign: "center" }}>Items already in your pantry are highlighted green</div>
          </div>
        )}

        {/* PANTRY VIEW */}
        {activeView === "pantry" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 6 }}>Pantry Inventory</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Track what you already have. These will be highlighted on your grocery list.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <input value={pantryInput} onChange={(e) => setPantryInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPantry()} placeholder="Add pantry item..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #D8D2C4", fontSize: 14, fontFamily: "inherit", background: "#FFF", color: "#1C1C1A" }} />
              <button onClick={addPantry} style={{ padding: "10px 20px", background: "#1C1C1A", color: "#F5F0E8", border: "none", borderRadius: 10, fontSize: 14, fontFamily: "inherit", fontWeight: 600, cursor: "pointer" }}>Add</button>
            </div>
            {pantry.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#B0A898", background: "#F5F2EA", borderRadius: 16, fontSize: 14 }}>No pantry items yet — add what you have at home.</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pantry.map((item) => (
                  <div key={item.id} className="pantry-tag" style={{ display: "flex", alignItems: "center", gap: 7, background: "#E8F5E9", border: "1px solid #A5D6A7", borderRadius: 20, padding: "6px 14px 6px 12px", fontSize: 13, color: "#2E7D32", fontWeight: 500 }}>
                    <span>🥬</span>
                    <span>{item.name}</span>
                    <button onClick={() => removePantry(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#81C784", marginLeft: 2, lineHeight: 1, padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 28, padding: 18, background: "#FFF8E8", border: "1px solid #FFE082", borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#795548", marginBottom: 6 }}>💡 Pantry Stocking Tip</div>
              <div style={{ fontSize: 13, color: "#6D5A4A", lineHeight: 1.6 }}>Always stock: olive oil, canned tomatoes, pasta, rice, dried lentils, canned beans, soy sauce, stock cubes, flour, sugar, salt, pepper, garlic. These form the backbone of 80% of weeknight meals and save you from expensive last-minute runs.</div>
            </div>
          </div>
        )}

        {/* TRACKER VIEW */}
        {activeView === "tracker" && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 6 }}>Waste & Savings Tracker</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Log food you've wasted to identify patterns and reduce your grocery bill over time.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Weekly Budget", value: `$${budget}`, color: "#1C1C1A" },
                { label: "Est. Meal Cost", value: `$${weekCost()}`, color: budgetColor },
                { label: "Food Wasted", value: `$${totalWaste}`, color: parseFloat(totalWaste) > 20 ? "#e53935" : "#43A047" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#FFF", borderRadius: 14, padding: "16px 18px", border: "1px solid #E5E0D4", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {addingWaste ? (
              <div style={{ background: "#FFF", borderRadius: 14, padding: 18, border: "1px solid #E5E0D4", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Log Wasted Item</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input value={wasteInput} onChange={(e) => setWasteInput(e.target.value)} placeholder="Item name (e.g. spinach, leftover soup)" style={{ flex: 2, minWidth: 160, padding: "9px 13px", borderRadius: 8, border: "1.5px solid #D8D2C4", fontSize: 13, fontFamily: "inherit" }} />
                  <input type="number" id="wasteCost" placeholder="Est. $" style={{ flex: 1, minWidth: 80, padding: "9px 13px", borderRadius: 8, border: "1.5px solid #D8D2C4", fontSize: 13, fontFamily: "inherit" }} />
                  <button onClick={() => {
                    const costEl = document.getElementById("wasteCost");
                    if (!wasteInput.trim()) return;
                    setWasteLog((prev) => [...prev, { name: wasteInput.trim(), cost: parseFloat(costEl.value) || 0, week: activeWeek, id: Date.now() }]);
                    setWasteInput(""); costEl.value = ""; setAddingWaste(false); showToast("Waste logged");
                  }} style={{ padding: "9px 18px", background: "#e53935", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13 }}>Log</button>
                  <button onClick={() => setAddingWaste(false)} style={{ padding: "9px 14px", background: "#F0EDE4", border: "1px solid #D8D2C4", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingWaste(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#FFF", border: "1.5px dashed #C8C0B0", borderRadius: 10, cursor: "pointer", fontSize: 13, fontFamily: "inherit", color: "#5C5040", fontWeight: 500, marginBottom: 16 }}>
                + Log wasted food
              </button>
            )}

            {wasteLog.length > 0 ? (
              <div style={{ background: "#FFF", borderRadius: 14, overflow: "hidden", border: "1px solid #E5E0D4" }}>
                <div style={{ padding: "12px 18px", background: "#FFF4F4", borderBottom: "1px solid #FFD0D0", fontSize: 12, fontWeight: 700, color: "#C62828", textTransform: "uppercase", letterSpacing: "0.6px" }}>Waste Log</div>
                {wasteLog.map((w, i) => (
                  <div key={w.id} style={{ display: "flex", alignItems: "center", padding: "11px 18px", borderBottom: i < wasteLog.length - 1 ? "1px solid #F5F0EA" : "none" }}>
                    <span style={{ fontSize: 15, marginRight: 10 }}>🗑</span>
                    <span style={{ flex: 1, fontSize: 13, color: "#333" }}>{w.name}</span>
                    <span style={{ fontSize: 12, color: "#888", marginRight: 14 }}>Week {w.week}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#e53935" }}>${w.cost.toFixed(2)}</span>
                    <button onClick={() => setWasteLog((p) => p.filter((x) => x.id !== w.id))} style={{ marginLeft: 12, background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#ccc" }}>×</button>
                  </div>
                ))}
                <div style={{ padding: "10px 18px", background: "#FFF4F4", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: "#888" }}>Total waste</span>
                  <span style={{ fontWeight: 700, color: "#e53935" }}>${totalWaste}</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 20px", color: "#B0A898", background: "#F9F6EF", borderRadius: 14, fontSize: 14 }}>No waste logged — great job! 🌿</div>
            )}

            <div style={{ marginTop: 20, padding: 18, background: "#F0F4FF", border: "1px solid #C5D1F5", borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#3949AB", marginBottom: 6 }}>📊 Reduce Waste Tips</div>
              <ul style={{ fontSize: 13, color: "#3D4B7A", lineHeight: 1.8, paddingLeft: 18 }}>
                <li>Shop mid-week — produce is often restocked Tuesday/Wednesday</li>
                <li>Freeze bread, meat, and cooked grains before they expire</li>
                <li>Do a "fridge audit" every Thursday before weekend shopping</li>
                <li>Batch-cook grains on Sunday for easy weekday lunches</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#1C1C1A", color: "#F5F0E8", padding: "10px 22px", borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

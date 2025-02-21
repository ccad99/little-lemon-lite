import { supabase } from "../services/supabaseClient";

// Fetch all menu items
export const getMenuItems = async () => {
   const { data, error } = await supabase.from("menu_items").select("*");
   if (error) {
      console.error("Supabase error:", error.message);
      throw new Error(error.message || "Menu Items could not be loaded");
   }
   return data;
};

// Fetch a single menu item by ID
export const getMenuItemById = async (id) => {
   const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .single();
   if (error) {
      console.error("Error fetching menu item:", error.message);
      throw new Error(`Failed to fetch menu item (ID: ${id})`);
   }
   return data;
};

// Update a menu item
export const updateMenuItem = async (id, updates) => {
   const { data, error } = await supabase
      .from("menu_items")
      .update(updates)
      .eq("id", id);
   if (error) {
      console.error(`Error updating menu item (ID: ${id}):`, error.message);
      throw new Error(`Failed to update menu item (ID: ${id})`);
   }
   return data;
};

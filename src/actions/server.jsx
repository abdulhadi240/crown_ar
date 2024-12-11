"use server";

export async function GetCategory(slug) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/categories/${slug}/specialization`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    return category.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}


export async function GetAllCategory() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/categories/`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    return category.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function GetSpecialization() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/specializations_categories`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    return category.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}



export async function GetSpecificSpecialization(slug) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/courses/${slug}/specializations`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}



export async function GetCities() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/cities`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    return category.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
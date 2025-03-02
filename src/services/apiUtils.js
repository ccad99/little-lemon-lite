let cachedAPI = null;

export async function loadAPI() {
   if (cachedAPI) return cachedAPI;

   try {
      // console.log("Loading API...");

      const response = await fetch(
         "https://raw.githubusercontent.com/courseraap/capstone/main/api.js"
      );

      if (!response.ok) {
         throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const scriptText = await response.text();

      // console.log("Fetched API script: ", scriptText);

      const scriptModule = new Function(scriptText + "; return fetchAPI;");
      cachedAPI = scriptModule();

      // console.log("API loaded successfully: ", cachedAPI);

      return cachedAPI;
   } catch (error) {
      console.error("Error loading API:", error);
      return null;
   }
}

// let cachedSubmitAPI = null;

export async function submitAPI(formData) {
   console.log("Submitting reservation data: ", formData);
   return true;
}

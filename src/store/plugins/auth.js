export const authPlugin = (store) => {
   store.dispatch('authStore/checkHasUserInto');
   store.subscribe((mutation, state) => {
      
   });
}
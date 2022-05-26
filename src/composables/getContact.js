import { ref } from "vue";
import { API_URL } from '@/config/variable'
const getContact = (id) => {
  const contact = ref({});
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch(API_URL + "/contacts/"+id);
      if (!data.ok) {
        throw Error("no data available");
      }
      contact.value = await data.json();
    } catch (error) {
      error.value = error.message;
    }
  };

  return { contact, error, load };
};

export default getContact

import { ref } from "vue";
import { API_URL } from '@/config/variable'
const getContacts = () => {
  const contacts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch(API_URL + "/contacts");
      if (!data.ok) {
        throw Error("no data available");
      }
      contacts.value = await data.json();
    } catch (error) {
      error.value = error.message;
    }
  };

  return { contacts, error, load };
};

export default getContacts

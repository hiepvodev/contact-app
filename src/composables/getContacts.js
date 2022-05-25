import { ref } from "vue";

const getContacts = () => {
  const contacts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:3001/contacts");
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

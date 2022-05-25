import { ref } from "vue";

const getContact = (id) => {
  const contact = ref({});
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:3001/contacts/"+id);
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

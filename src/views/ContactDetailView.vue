<script setup>
import getContact from "@/composables/getContact";
import { computed } from "vue";

const props = defineProps(["id"]);
const { contact, error, load } = getContact(props.id);

load();

const shortName = computed(() => {
  return contact.value.lastName.substring(0,2)
})

const handleDelete = async () => {
  let result = confirm("Want to delete?");
  if (result) {
    try {
      let data = await fetch("http://localhost:3001/contacts/"+props.id, {
        method: 'DELETE',
      });
      if (!data.ok) {
        throw Error("no data available");
      }
      console.log(data);
    } catch (error) {
      errorSave.value = error.message;
      console.log(error);
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <a class="back" @click="$router.go(-1)">&lt; BACK</a>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="contact">
      <div class="contact-detail">
        <div class="avatar">{{shortName}}</div>
        <div class="form-wrap">
          <div class="form-input">
            <label>First Name</label>
            <p>{{ contact.firstName }}</p>
          </div>
          <div class="form-input">
            <label>Last Name</label>
            <p>{{ contact.lastName }}</p>
          </div>
          <div class="form-input">
            <label>Phone Number</label>
            <p>{{ contact.phone }}</p>
          </div>
          <div class="form-input">
            <label>Email Address</label>
            <p>{{ contact.email }}</p>
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <router-link :to="{ name: 'contactEdit', params: { id:  contact.id}}">
          <button class="edit"><mdicon name="PencilOutline" /></button>
        </router-link>
        <button class="delete" @click="handleDelete"><mdicon name="TrashCanOutline" /></button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.back {
  color: #9b9b9b;
  cursor: pointer;
}
.contact-detail {
  text-align: center;
}
.form-wrap {
  text-align: left;
}
.avatar {
  font-size: 50px;
  color: #004c78;
  display: inline-block;
  padding: 20px 25px;
  border-radius: 50%;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  margin-bottom: 50px;
}
.form-input {
  margin-bottom: 20px;
  line-height: 20px;
}
.form-input label {
  color: #004c78;
  font-size: 16px;
}
.form-input p {
  font-size: 18px;
  color: #858585;
}
.edit,
.delete {
  padding: 5px 12px;
  border-radius: 50%;
  border: none;
  margin: 0px 5px;
  color: #fff;
  cursor: pointer;
  font-size: 32px;
}
.edit {
  background-color: #4343db;
}
.delete {
  background-color: #d50000;
}
.btn-group {
  text-align: center;
  display: inline-block;
  position: absolute;
  left: 45%;
  bottom: -70px;
}
</style>

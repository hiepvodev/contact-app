<script setup>
import getContact from "@/composables/getContact";
import { computed, ref, watch } from "vue";
import { useRouter } from 'vue-router'
import { API_URL } from '@/config/variable'

const props = defineProps(["id"]);
const { contact, error, load } = getContact(props.id);
const router = useRouter()

load();


const shortName = computed(() => {
  return contact.value?.lastName?.substring(0, 2);
});

const userInfo = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
})

const errorSave = ref(null);

setTimeout(() => {
  userInfo.value = {
    firstName: contact.value.firstName,
    lastName: contact.value.lastName,
    phone: contact.value.phone,
    email: contact.value.email,
  }
  console.log(11111, userInfo.value);
}, 500)

const handleSave = async () => {
  try {
    let data = await fetch(API_URL + "/contacts/"+props.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userInfo.value)
    });
    if (!data.ok) {
      throw Error("no data available");
    }
    router.go(-1)
  } catch (error) {
    errorSave.value = error.message;
    console.log(error);
  }
}

</script>

<template>
  <div class="wrapper">
    <a class="back" @click="$router.go(-1)">&lt; BACK</a>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="contact">
      <div class="contact-detail">
        <div class="avatar">{{ shortName }}</div>
        <div class="form-wrap">
          <div class="form-input">
            <label>First Name</label><br />
            <input type="text" v-model="userInfo.firstName"/>
          </div>
          <div class="form-input">
            <label>Last Name</label><br />
            <input type="text" v-model="userInfo.lastName" />
          </div>
          <div class="form-input">
            <label>Phone Number</label><br />
            <input type="text" v-model="userInfo.phone" />
          </div>
          <div class="form-input">
            <label>Email Address</label><br />
            <input type="text" v-model="userInfo.email" />
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <button class="save" @click="handleSave"><mdicon name="ContentSaveOutline" /></button>
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
.btn-group {
  text-align: center;
  display: inline-block;
  position: absolute;
  left: 45%;
  bottom: -70px;
}
input {
  border: none;
  border-bottom: 1px solid #a9a9a9;
  width: 100%;
  font-size: 18px;
}
input:focus {
  outline: none;
}

.save {
  padding: 5px 12px;
  border-radius: 50%;
  border: none;
  margin: 0px 5px;
  color: #fff;
  cursor: pointer;
  font-size: 32px;
  background-color: #4343db;
}
</style>

<script setup>
import searchIcon from "@/assets/images/Search_Icon.svg";
import butterfly from "@/assets/images/buttlefly.jpg";
import { ref, computed } from "vue";
import getContacts from "@/composables/getContacts"

const { contacts, error, load } = getContacts();

load()

const search = ref("");

const searchItems = computed(() => {
  return contacts.value.filter((item) => {
    return (
      (item.firstName+' '+item.lastName).includes(search.value) || item.phone.includes(search.value)
    );
  });
});
</script>

<template>
  <div class="wrapper">
    <h1 class="title">MY CONTACT</h1>
    <div class="search-input">
      <input
        v-model="search"
        type="text"
        placeholder="Type name or number"
        class="input"
      />
      <img :src="searchIcon" alt="" class="icon-search" />
    </div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="contacts.length > 0">
      <div class="list-items">
        <router-link  v-for="item in searchItems" :key="item.id" :to="{ name: 'contactDetail', params: { id: item.id } }">
          <div class="item">
            <img class="item-image" :src="butterfly" alt="" />
            <div class="detail">
              <p class="item-name">{{ item.firstName+' '+item.lastName }}</p>
              <p class="item-phone">{{ item.phone }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div style="text-align: center">
        <router-link class="link-add" :to="{ name: 'contactAdd'}">
          <button class="add-contact">+</button>
        </router-link>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.title {
  color: #9b9b9b;
}
.search-input {
  position: relative;
  display: inline-block;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  width: 100%;
}
.input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  width: 100%;
}
.icon-search {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 8px;
}
.list-items {
  margin-top: 50px;
}
.item {
  display: flex;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.item-image {
  width: 80px;
  height: 80px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-right: 10px;
}
.item-name {
  color: #006fb1;
}
.item-phone {
  color: #858585;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.add-contact {
  padding: 7px 15px;
  border-radius: 50%;
  border: unset;
  background-color: #4343db;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
}


a {
  text-decoration: none!important;
}
</style>

<template>
  <a v-for="link in LINKS" :href="link.url">{{ link.text }}</a>
</template>

<script setup>
const LINKS = [
  { url: "/", text: "MADE" },
  { url: "/", text: "WITH" },
  { url: "/", text: "VUE" },
];
</script>

<style>
aside#sidebar {
  background: #ef233c;
  color: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

a {
  margin-bottom: 16px;
  color: white;
  border-bottom: 1px solid  white;
  text-decoration: none;
  transition: transform 200ms;
}

a::visited {
  color: white;
}
a:hover {
  transform: scale(1.1);
}
</style>

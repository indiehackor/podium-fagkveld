<template>
  <a v-for="link in LINKS" :href="link.url">{{ link.text }}</a>
</template>

<script setup>
const LINKS = [
  { url: "/", text: "Home" },
  { url: "/foo", text: "Foo" },
  { url: "/bar", text: "Bar" },
];
</script>

<style>
aside#sidebar {
  background: red;
  color: white;
  padding: 24px;
}


a {
  padding: 8px;
}
</style>

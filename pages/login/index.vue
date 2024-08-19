<template>
  <Container>
    <LoginForm />
  </Container>
</template>

<script setup lang="ts">
  const pageData = reactive({
    title: 'Login to Todo List',
    desctiption: 'Login to Todo List to access content',
  })

  useHead({
    title: pageData.title,
    meta: [{ name: 'description', content: pageData.desctiption }],
  })
  useSeoMeta({
    title: pageData.title,
    ogTitle: pageData.title,
    description: pageData.desctiption,
    ogDescription: pageData.desctiption,
  })
</script>

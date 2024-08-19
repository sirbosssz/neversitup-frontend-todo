<template>
  <div class="input-group mt-2">
    <label :for="name" class="pl-2">{{ label }}:</label>
    <textarea
      class="w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      :v-model="modelValue"
      :v-bind="attrs"
      @input="updateValue"
    ></textarea>
    <InputError :message="error" />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
    attrs: {},
  })

  const emit = defineEmits(['update:modelValue'])

  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
</script>

<style scoped></style>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { ref, type HTMLAttributes } from 'vue';

const props = defineProps<{
  defaultValue?: string;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
  isValid?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const imagePreview = ref<string | null>(props.defaultValue ?? null);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    emits('update:modelValue', file.name);
  }
};

const removePreview = () => {
  imagePreview.value = null;
};
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div v-if="imagePreview" class="w-full h-36 relative">
      <img :src="imagePreview" alt="Uploaded Image" class="w-full h-full object-contain" />
      <div
        class="absolute right-1 top-1 cursor-pointer bg-alert-soft h-7 w-7 grid place-content-center rounded-full"
        @click="removePreview"
      >
        <X class="w-4 h-4 text-alert" />
      </div>
    </div>
    <label
      v-else
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-36 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-primary-soft"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1294_12370)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.80952 7.16602H25.8571C26.8675 7.16602 27.8365 7.56738 28.5509 8.2818C29.2653 8.99622 29.6667 9.96519 29.6667 10.9755V30.0232C29.6667 31.0335 29.2653 32.0025 28.5509 32.7169C27.8365 33.4313 26.8675 33.8327 25.8571 33.8327H6.80952C5.79918 33.8327 4.83021 33.4313 4.11578 32.7169C3.40136 32.0025 3 31.0335 3 30.0232V10.9755C3 9.96519 3.40136 8.99622 4.11578 8.2818C4.83021 7.56738 5.79918 7.16602 6.80952 7.16602Z"
              fill="#E6F6F8"
              stroke="#00A2B9"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.6667 26.2133L23.9524 20.499L18.2381 26.1847M25.8571 33.8323L8.71429 16.6895L3 22.4037"
              stroke="#00A2B9"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 17.7373C19.0519 17.7373 19.9047 16.8845 19.9047 15.8325C19.9047 14.7805 19.0519 13.9277 18 13.9277C16.948 13.9277 16.0952 14.7805 16.0952 15.8325C16.0952 16.8845 16.948 17.7373 18 17.7373Z"
              fill="#00A2B9"
            />
            <g clip-path="url(#clip1_1294_12370)">
              <path
                d="M28.3332 15.4173C32.0151 15.4173 34.9998 12.4325 34.9998 8.75065C34.9998 5.06875 32.0151 2.08398 28.3332 2.08398C24.6513 2.08398 21.6665 5.06875 21.6665 8.75065C21.6665 12.4325 24.6513 15.4173 28.3332 15.4173Z"
                fill="#00A2B9"
                stroke="#00A2B9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.3333 6.08398V11.4173"
                stroke="#E6F6F8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.6665 8.75H30.9998"
                stroke="#E6F6F8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1294_12370">
              <rect width="40" height="40" fill="white" transform="translate(0 0.5)" />
            </clipPath>
            <clipPath id="clip1_1294_12370">
              <rect width="16" height="16" fill="white" transform="translate(20.3333 0.75)" />
            </clipPath>
          </defs>
        </svg>

        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" @change="handleChange" />
    </label>
  </div>
</template>

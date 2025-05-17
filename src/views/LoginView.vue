<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4"
  >
    <div
      class="w-full max-w-md p-6 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          POS System
        </h1>
        <p class="text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </div>

      <form class="space-y-6">
        <div class="space-y-1">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            autofocus
          />
        </div>

        <div class="space-y-1">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Password</label
          >
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Account type
          </label>
          <div
            class="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700"
          >
            <button
              type="button"
              @click="isManager = 0"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out',
                isManager === 0
                  ? 'bg-primary dark:bg-dark-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
              ]"
            >
              Cashier
            </button>
            <button
              type="button"
              @click="isManager = 1"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out',
                isManager === 1
                  ? 'bg-primary dark:bg-dark-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
              ]"
            >
              Manager
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <div class="relative flex items-center">
              <input type="checkbox" class="sr-only peer" />
              <div
                class="w-5 h-5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 peer-checked:bg-primary dark:peer-checked:bg-dark-primary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:peer-focus:ring-dark-primary peer-focus:border-transparent dark:peer-focus:border-transparent transition-colors duration-200"
              ></div>

              <div
                class="absolute left-0.5 top-0.5 w-4 h-4 text-white transform scale-0 peer-checked:scale-100 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >Remember me</span
            >
          </label>

          <a
            href="#"
            class="text-sm text-primary hover:text-primary-hover dark:text-dark-primary dark:hover:text-dark-primary-hover hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover dark:bg-dark-primary dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Sign In
        </button>
      </form>

      <div class="mt-6 text-center">
        <button
          id="theme-toggle"
          class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2 inline-flex items-center"
        >
          <svg
            id="theme-toggle-dark-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const isManager = ref(0);

onMounted(() => {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    document
      .getElementById("theme-toggle-light-icon")
      .classList.remove("hidden");
  } else {
    document
      .getElementById("theme-toggle-dark-icon")
      .classList.remove("hidden");
  }

  document
    .getElementById("theme-toggle")
    .addEventListener("click", function () {
      document
        .getElementById("theme-toggle-dark-icon")
        .classList.toggle("hidden");
      document
        .getElementById("theme-toggle-light-icon")
        .classList.toggle("hidden");

      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("color-theme", "dark");
      } else {
        localStorage.setItem("color-theme", "light");
      }
    });
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        Customer Management
      </h1>
      <button
        @click="openCreateModal"
        class="flex items-center space-x-2 bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover text-white py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add Customer</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative col-span-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search customers..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 dark:text-gray-500 absolute left-3 top-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div class="flex space-x-4">
        <select
          v-model="sortBy"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date Added</option>
        </select>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-5 w-5 mr-3 text-primary dark:text-dark-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading customers...
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="px-6 py-4 text-center text-red-500">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="filteredCustomers.length === 0 && !isLoading">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No customers found matching your criteria
              </td>
            </tr>
            <tr
              v-else
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    {{ getInitials(customer.first_name + " " + customer.last_name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ customer.first_name }} {{ customer.last_name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ customer.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {{ customer.point || 0 }} pts
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ customer.phone || "N/A" }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ getShortAddress(customer.address) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="viewCustomer(customer)"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  @click="editCustomer(customer)"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(customer)"
                  class="text-gray-600 dark:text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-medium">{{ paginationStart }}</span>
              to
              <span class="font-medium">{{ paginationEnd }}</span>
              of
              <span class="font-medium">{{ totalCustomers }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1 || isLoading"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <template v-for="page in totalPages" :key="page">
                <button
                  v-if="
                    page === currentPage ||
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  "
                  @click="currentPage = page"
                  :disabled="isLoading"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    currentPage === page
                      ? 'z-10 bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary text-white'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600',
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else-if="page === currentPage - 2 || page === currentPage + 2"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  ...
                </span>
              </template>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages || isLoading"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form @submit.prevent="saveCustomer" class="max-h-[calc(100vh-8rem)] flex flex-col">
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{ isEditing ? "Edit Customer" : "Add New Customer" }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          for="first_name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >First Name</label>
                        <input
                          id="first_name"
                          v-model="currentCustomer.first_name"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Last Name</label>
                        <input
                          id="last_name"
                          v-model="currentCustomer.last_name"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Email Address</label>
                      <input
                        id="email"
                        v-model="currentCustomer.email"
                        type="email"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <input type="hidden" v-model="currentCustomer.role" value="3" />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Phone Number</label>
                      <input
                        id="phone"
                        v-model="currentCustomer.phone"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="gender"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Gender</label>
                      <select
                        id="gender"
                        v-model="currentCustomer.gender"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                      >
                        <option :value="0">Male</option>
                        <option :value="1">Female</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="address"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Address</label>
                      <textarea
                        id="address"
                        v-model="currentCustomer.address"
                        rows="2"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      ></textarea>
                    </div>
                    <div v-if="!isEditing">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Password</label>
                      <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div v-if="!isEditing">
                      <label
                        for="password_confirmation"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Confirm Password</label>
                      <input
                        id="password_confirmation"
                        v-model="passwordConfirmation"
                        type="password"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0">
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
                :disabled="isSaving"
              >
                <svg
                  v-if="isSaving"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{
                  isEditing
                    ? isSaving
                      ? "Saving..."
                      : "Save Changes"
                    : isSaving
                    ? "Creating..."
                    : "Create Customer"
                }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeViewModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="max-h-[calc(100vh-8rem)] flex flex-col">
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    Customer Details
                  </h3>
                  <div class="mt-4">
                    <div class="flex justify-center mb-5">
                      <div
                        class="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl"
                      >
                        {{ getInitials(currentCustomer.first_name + " " + currentCustomer.last_name) }}
                      </div>
                    </div>
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                          {{ currentCustomer.first_name }} {{ currentCustomer.last_name }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Gender
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentCustomer.gender === 0 ? "Male" : "Female" }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Points
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentCustomer.point || 0 }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Email
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentCustomer.email }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Phone
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentCustomer.phone || 'N/A' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentCustomer.address || 'N/A' }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Account Created
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentCustomer.created_at) }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Last Updated
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentCustomer.updated_at) }}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0">
              <button
                type="button"
                @click="editCustomer(currentCustomer)"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                Edit
              </button>
              <button
                type="button"
                @click="closeViewModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600 dark:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Delete Customer Account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete the account for "{{ currentCustomer.first_name + " " + currentCustomer.last_name }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteCustomer"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isDeleting"
            >
              <svg
                v-if="isDeleting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isDeleting ? "Deleting..." : "Delete" }}
            </button>
            <button
              type="button"
              @click="closeDeleteModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import apiService from "../../services/api";

const customers = ref([]);
const totalCustomers = ref(0);
const isLoading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const sortBy = ref("name");
const sortDirection = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(1);

const isModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const currentCustomer = ref({
  id: null,
  role: 3,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: 0,
  address: "",
  company_name: "",
  point: 0,
  created_at: new Date(),
  updated_at: new Date(),
});
const password = ref("");
const passwordConfirmation = ref("");

const fetchCustomers = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    let column = "first_name";
    if (sortBy.value === "date") column = "created_at";

    const params = {
      limit: itemsPerPage.value * 3,
      page: currentPage.value,
      column: column,
      direction: sortDirection.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    const response = await apiService.getUsers(params);

    if (response.data && response.data.data) {
      const customerUsers = response.data.data.data.filter(
        user => parseInt(user.role) === 3
      );
      
      customers.value = customerUsers;
      
      const customerRatio = customerUsers.length / response.data.data.data.length || 1;
      totalCustomers.value = Math.floor(response.data.data.total * customerRatio);
      
      currentPage.value = response.data.data.current_page;
      totalPages.value = Math.max(1, Math.ceil(totalCustomers.value / itemsPerPage.value));
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    error.value = "Failed to load customers. Please try again.";
    customers.value = [];
    totalPages.value = 1;
    totalCustomers.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const createCustomer = async () => {
  if (!validateCustomerForm()) return;
  
  isSaving.value = true;
  
  try {
    const customerData = {
      ...currentCustomer.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    };
    
    await apiService.createUser(customerData);
    closeModal();
    fetchCustomers();
  } catch (err) {
    console.error("Failed to create customer:", err);
    alert(`Failed to create customer. ${err.response?.data?.message || "Please try again."}`);
  } finally {
    isSaving.value = false;
  }
};

const updateCustomer = async () => {
  if (!validateCustomerForm(true)) return;
  
  isSaving.value = true;
  
  try {
    const customerData = { ...currentCustomer.value };
    
    customerData.role = 3;
    
    if (password.value) {
      customerData.password = password.value;
      customerData.password_confirmation = passwordConfirmation.value;
    }
    
    await apiService.updateUser(currentCustomer.value.id, customerData);
    closeModal();
    fetchCustomers();
  } catch (err) {
    console.error("Failed to update customer:", err);
    alert("Failed to update customer. Please try again.");
  } finally {
    isSaving.value = false;
  }
};

const deleteCustomer = async () => {
  isDeleting.value = true;
  
  try {
    await apiService.deleteUser(currentCustomer.value.id);
    closeDeleteModal();
    fetchCustomers();
  } catch (err) {
    console.error("Failed to delete customer:", err);
    alert(`Failed to delete customer. ${err.response?.data?.message || "Please try again."}`);
  } finally {
    isDeleting.value = false;
  }
};

const validateCustomerForm = (isEdit = false) => {
  if (!currentCustomer.value.first_name) {
    alert("First name is required");
    return false;
  }
  
  if (!currentCustomer.value.email) {
    alert("Email is required");
    return false;
  }
  
  if (currentCustomer.value.phone) {
    const phoneDigits = currentCustomer.value.phone.replace(/\D/g, '');
    
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      alert("Phone number must be between 10 and 13 digits");
      return false;
    }
  }
  
  if (!isEdit && !password.value) {
    alert("Password is required for new customers");
    return false;
  }
  
  if (password.value && password.value !== passwordConfirmation.value) {
    alert("Passwords do not match");
    return false;
  }
  
  return true;
};

const saveCustomer = () => {
  if (isEditing.value) {
    updateCustomer();
  } else {
    createCustomer();
  }
};

const filteredCustomers = computed(() => {
  return customers.value;
});

const paginationStart = computed(() => {
  if (customers.value.length === 0) return 0;
  return 1 + (currentPage.value - 1) * itemsPerPage.value;
});

const paginationEnd = computed(() => {
  if (customers.value.length === 0) return 0;
  return paginationStart.value + customers.value.length - 1;
});

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getShortAddress = (address) => {
  if (!address) return "";
  const firstLine = address.split("\n")[0];
  return firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine;
};

const openCreateModal = () => {
  isEditing.value = false;
  currentCustomer.value = {
    id: null,
    role: 3,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: 0,
    address: "",
    company_name: "",
    point: 0,
  };
  password.value = "";
  passwordConfirmation.value = "";
  isModalOpen.value = true;
};

const editCustomer = (customer) => {
  isEditing.value = true;
  currentCustomer.value = { ...customer };
  currentCustomer.value.role = parseInt(currentCustomer.value.role);
  currentCustomer.value.gender = parseInt(currentCustomer.value.gender);
  password.value = "";
  passwordConfirmation.value = "";
  isViewModalOpen.value = false;
  isModalOpen.value = true;
};

const viewCustomer = (customer) => {
  currentCustomer.value = { ...customer };
  isViewModalOpen.value = true;
};

const confirmDelete = (customer) => {
  currentCustomer.value = { ...customer };
  isDeleteModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

watch(searchQuery, () => {
  currentPage.value = 1;
  fetchCustomers();
});

watch([sortBy, sortDirection], () => {
  fetchCustomers();
});

watch(currentPage, () => {
  fetchCustomers();
});

onMounted(() => {
  fetchCustomers();
});
</script>
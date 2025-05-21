<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        Suppliers Management
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
        <span>Add Supplier</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative col-span-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search suppliers..."
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
          v-model="categoryFilter"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="food">Food & Beverage</option>
          <option value="equipment">Equipment</option>
          <option value="packaging">Packaging</option>
          <option value="merchandise">Merchandise</option>
        </select>
        <select
          v-model="sortBy"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by Location</option>
          <option value="created_at">Sort by Date Added</option>
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
                Supplier
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
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr v-if="isLoading">
              <td
                colspan="5"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                <div class="flex justify-center items-center">
                  <svg
                    class="animate-spin h-5 w-5 mr-3 text-primary dark:text-dark-primary"
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
                  Loading suppliers...
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="px-6 py-4 text-center text-red-500">
                {{ error }}
              </td>
            </tr>
            <tr
              v-else
              v-for="supplier in filteredSuppliers"
              :key="supplier.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    {{ getInitials(supplier.first_name + " " + supplier.last_name) }}
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ supplier.first_name }} {{ supplier.last_name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ supplier.company_name || "No Company" }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ supplier.email }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ supplier.phone }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ getShortAddress(supplier.address) }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="viewSupplier(supplier)"
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
                  @click="editSupplier(supplier)"
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
                  @click="confirmDelete(supplier)"
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
            <tr v-if="filteredSuppliers.length === 0 && !isLoading">
              <td
                colspan="5"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No suppliers found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination section - keep as is -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <!-- Existing pagination content -->
      </div>
    </div>

    <!-- Modal for creating/editing -->
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

        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form
            @submit.prevent="saveSupplier"
            class="max-h-[calc(100vh-8rem)] flex flex-col"
          >
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
              <div v-if="validationErrors" class="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                      {{ validationErrors.message }}
                    </h3>
                    <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                      <ul class="list-disc pl-5 space-y-1">
                        <template v-for="(errors, field) in validationErrors.errors" :key="field">
                          <li v-for="error in errors" :key="error">{{ error }}</li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{ isEditing ? "Edit Supplier" : "Add New Supplier" }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          for="first_name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >First Name</label
                        >
                        <input
                          id="first_name"
                          v-model="currentSupplier.first_name"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Last Name</label
                        >
                        <input
                          id="last_name"
                          v-model="currentSupplier.last_name"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Email Address</label
                      >
                      <input
                        id="email"
                        v-model="currentSupplier.email"
                        type="email"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <input type="hidden" v-model="currentSupplier.role" value="2" />
                    </div>
                    <div>
                      <label
                        for="company_name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Company Name</label
                      >
                      <input
                        id="company_name"
                        v-model="currentSupplier.company_name"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Phone Number</label
                      >
                      <input
                        id="phone"
                        v-model="currentSupplier.phone"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="gender"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Gender</label
                      >
                      <select
                        id="gender"
                        v-model="currentSupplier.gender"
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
                        >Address</label
                      >
                      <textarea
                        id="address"
                        v-model="currentSupplier.address"
                        rows="2"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      ></textarea>
                    </div>
                    <div v-if="!isEditing">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Password</label
                      >
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
                        >Confirm Password</label
                      >
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
                {{ isEditing ? (isSaving ? "Saving..." : "Save Changes") : (isSaving ? "Creating..." : "Create Supplier") }}
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

        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="max-h-[calc(100vh-8rem)] flex flex-col">
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    Supplier Details
                  </h3>
                  <div class="mt-4">
                    <div class="flex justify-center mb-5">
                      <div
                        class="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl"
                      >
                        {{ getInitials(
                          currentSupplier.first_name +
                            " " +
                            currentSupplier.last_name
                        ) }}
                      </div>
                    </div>
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                          {{ currentSupplier.first_name }}
                          {{ currentSupplier.last_name }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Company
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentSupplier.company_name || "N/A" }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Category
                        </dt>
                        <dd class="mt-1">
                          <span
                            class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="{
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                                currentSupplier.category === 'food',
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                                currentSupplier.category === 'equipment',
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                                currentSupplier.category === 'packaging',
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                                currentSupplier.category === 'merchandise',
                            }"
                          >
                            {{ getCategoryLabel(currentSupplier.category) }}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Gender
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentSupplier.gender === 0 ? "Male" : "Female" }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Email
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentSupplier.email }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Phone
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentSupplier.phone }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentSupplier.address }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Account Created
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentSupplier.created_at) }}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Last Updated
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentSupplier.updated_at) }}
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
                @click="editSupplier(currentSupplier)"
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

        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                  Delete Supplier Account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete the account for "{{
                      currentSupplier.first_name +
                      " " +
                      currentSupplier.last_name
                    }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteSupplier"
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

const suppliers = ref([]);
const totalSuppliers = ref(0);
const isLoading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const categoryFilter = ref("");
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
const validationErrors = ref(null);
const currentSupplier = ref({
  id: null,
  role: 2,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: 0,
  address: "",
  company_name: "",
  category: "food",
  status: "active",
  notes: "",
  created_at: new Date(),
  updated_at: new Date(),
});
const password = ref("");
const passwordConfirmation = ref("");

const fetchSuppliers = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    let column = "first_name";
    if (sortBy.value === "city") column = "address";
    if (sortBy.value === "created_at") column = "created_at";

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
      const supplierUsers = response.data.data.data.filter(
        user => parseInt(user.role) === 2
      );
      
      if (categoryFilter.value) {
        suppliers.value = supplierUsers.filter(
          supplier => supplier.category === categoryFilter.value
        );
      } else {
        suppliers.value = supplierUsers;
      }
      
      const supplierRatio = supplierUsers.length / response.data.data.data.length || 1;
      totalSuppliers.value = Math.floor(response.data.data.total * supplierRatio);
      
      currentPage.value = response.data.data.current_page;
      totalPages.value = Math.max(1, Math.ceil(totalSuppliers.value / itemsPerPage.value));
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (err) {
    console.error("Failed to fetch suppliers:", err);
    error.value = "Failed to load suppliers. Please try again.";
    suppliers.value = [];
    totalPages.value = 1;
    totalSuppliers.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const createSupplier = async () => {
  if (!validateSupplierForm()) return;
  
  isSaving.value = true;
  validationErrors.value = null;
  
  try {
    const supplierData = {
      ...currentSupplier.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    };
    
    await apiService.createUser(supplierData);
    closeModal();
    fetchSuppliers();
  } catch (err) {
    console.error("Failed to create supplier:", err);
    if (err.response && err.response.status === 422) {
      validationErrors.value = err.response.data;
    } else {
      alert("Failed to create supplier. Please try again.");
    }
  } finally {
    isSaving.value = false;
  }
};

const updateSupplier = async () => {
  if (!validateSupplierForm(true)) return;
  
  isSaving.value = true;
  validationErrors.value = null;
  
  try {
    const supplierData = { ...currentSupplier.value };
    
    supplierData.role = 2;
    
    if (password.value) {
      supplierData.password = password.value;
      supplierData.password_confirmation = passwordConfirmation.value;
    }
    
    await apiService.updateUser(currentSupplier.value.id, supplierData);
    closeModal();
    fetchSuppliers();
  } catch (err) {
    console.error("Failed to update supplier:", err);
    if (err.response && err.response.status === 422) {
      validationErrors.value = err.response.data;
    } else {
      alert("Failed to update supplier. Please try again.");
    }
  } finally {
    isSaving.value = false;
  }
};

const deleteSupplier = async () => {
  isDeleting.value = true;
  
  try {
    await apiService.deleteUser(currentSupplier.value.id);
    closeDeleteModal();
    fetchSuppliers();
  } catch (err) {
    console.error("Failed to delete supplier:", err);
    alert(`Failed to delete supplier. ${err.response?.data?.message || "It may be referenced by other records."}`);
  } finally {
    isDeleting.value = false;
  }
};

const validateSupplierForm = (isEdit = false) => {
  if (!currentSupplier.value.first_name) {
    alert("First name is required");
    return false;
  }
  
  if (!currentSupplier.value.email) {
    alert("Email is required");
    return false;
  }
  
  if (!currentSupplier.value.category) {
    alert("Category is required");
    return false;
  }
  
  if (currentSupplier.value.phone) {
    const phoneDigits = currentSupplier.value.phone.replace(/\D/g, '');
    
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      alert("Phone number must be between 10 and 13 digits");
      return false;
    }
  }
  
  if (!isEdit && !password.value) {
    alert("Password is required for new suppliers");
    return false;
  }
  
  if (password.value && password.value !== passwordConfirmation.value) {
    alert("Passwords do not match");
    return false;
  }
  
  return true;
};

const saveSupplier = () => {
  if (isEditing.value) {
    updateSupplier();
  } else {
    createSupplier();
  }
};

const filteredSuppliers = computed(() => {
  return suppliers.value;
});

const paginationStart = computed(() => {
  if (suppliers.value.length === 0) return 0;
  return 1 + (currentPage.value - 1) * itemsPerPage.value;
});

const paginationEnd = computed(() => {
  if (suppliers.value.length === 0) return 0;
  return paginationStart.value + suppliers.value.length - 1;
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

const getCategoryLabel = (category) => {
  switch (category) {
    case "food":
      return "Food & Beverage";
    case "equipment":
      return "Equipment";
    case "packaging":
      return "Packaging";
    case "merchandise":
      return "Merchandise";
    default:
      return category || "Uncategorized";
  }
};

const getShortAddress = (address) => {
  if (!address) return "";
  const firstLine = address.split("\n")[0];
  return firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine;
};

const openCreateModal = () => {
  isEditing.value = false;
  validationErrors.value = null;
  currentSupplier.value = {
    id: null,
    role: 2,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: 0,
    address: "",
    company_name: "",
    status: "active",
    notes: "",
  };
  password.value = "";
  passwordConfirmation.value = "";
  isModalOpen.value = true;
};

const editSupplier = (supplier) => {
  isEditing.value = true;
  validationErrors.value = null;
  currentSupplier.value = { ...supplier };
  currentSupplier.value.role = parseInt(currentSupplier.value.role);
  currentSupplier.value.gender = parseInt(currentSupplier.value.gender);
  password.value = "";
  passwordConfirmation.value = "";
  isViewModalOpen.value = false;
  isModalOpen.value = true;
};

const viewSupplier = (supplier) => {
  currentSupplier.value = { ...supplier };
  isViewModalOpen.value = true;
};

const confirmDelete = (supplier) => {
  currentSupplier.value = { ...supplier };
  isDeleteModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  validationErrors.value = null;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

watch(searchQuery, () => {
  currentPage.value = 1;
  fetchSuppliers();
});

watch(categoryFilter, () => {
  currentPage.value = 1;
  fetchSuppliers();
});

watch([sortBy, sortDirection], () => {
  fetchSuppliers();
});

watch(currentPage, () => {
  fetchSuppliers();
});

onMounted(() => {
  fetchSuppliers();
});
</script>
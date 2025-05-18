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
          <option value="location">Sort by Location</option>
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
                Supplier
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Category
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
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
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
            <tr
              v-for="supplier in filteredSuppliers"
              :key="supplier.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    {{ getInitials(supplier.name) }}
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ supplier.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      #{{ supplier.id }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                      supplier.category === 'food',
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      supplier.category === 'equipment',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                      supplier.category === 'packaging',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                      supplier.category === 'merchandise',
                  }"
                >
                  {{ getCategoryLabel(supplier.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ supplier.contactName }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ supplier.phone }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ supplier.city }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ supplier.country }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      supplier.status === 'active',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                      supplier.status === 'pending',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                      supplier.status === 'inactive',
                  }"
                >
                  {{
                    supplier.status === "active"
                      ? "Active"
                      : supplier.status === "pending"
                      ? "Pending"
                      : "Inactive"
                  }}
                </span>
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
            <tr v-if="filteredSuppliers.length === 0">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No suppliers found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
      >
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-medium">{{ paginationStart }}</span>
              to
              <span class="font-medium">{{ paginationEnd }}</span>
              of
              <span class="font-medium">{{ suppliers.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
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
                  v-else-if="
                    page === currentPage - 2 || page === currentPage + 2
                  "
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  ...
                </span>
              </template>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
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
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form
            @submit.prevent="saveSupplier"
            class="max-h-[calc(100vh-8rem)] flex flex-col"
          >
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto"
            >
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{ isEditing ? "Edit Supplier" : "Add New Supplier" }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Company Name</label
                      >
                      <input
                        id="name"
                        v-model="currentSupplier.name"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="category"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Category</label
                      >
                      <select
                        id="category"
                        v-model="currentSupplier.category"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="food">Food & Beverage</option>
                        <option value="equipment">Equipment</option>
                        <option value="packaging">Packaging</option>
                        <option value="merchandise">Merchandise</option>
                      </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          for="contactName"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Contact Person</label
                        >
                        <input
                          id="contactName"
                          v-model="currentSupplier.contactName"
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >City</label
                        >
                        <input
                          id="city"
                          v-model="currentSupplier.city"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Country</label
                        >
                        <input
                          id="country"
                          v-model="currentSupplier.country"
                          type="text"
                          class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                        />
                      </div>
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
                    <div>
                      <label
                        for="status"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Status</label
                      >
                      <select
                        id="status"
                        v-model="currentSupplier.status"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="notes"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Notes</label
                      >
                      <textarea
                        id="notes"
                        v-model="currentSupplier.notes"
                        rows="3"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0">
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-dark-primary text-base font-medium text-white hover:bg-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ isEditing ? "Save Changes" : "Create Supplier" }}
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
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeViewModal"
        ></div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Supplier Details
                </h3>
                <div class="mt-4">
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    <div class="sm:col-span-2">
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Company
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 dark:text-white font-medium"
                      >
                        {{ currentSupplier.name }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
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
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </dt>
                      <dd class="mt-1">
                        <span
                          class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                              currentSupplier.status === 'active',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                              currentSupplier.status === 'pending',
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                              currentSupplier.status === 'inactive',
                          }"
                        >
                          {{
                            currentSupplier.status === "active"
                              ? "Active"
                              : currentSupplier.status === "pending"
                              ? "Pending"
                              : "Inactive"
                          }}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Contact Person
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.contactName }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Phone
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.phone }}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.email }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        City
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.city }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Country
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.country }}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Address
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.address }}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Notes
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ currentSupplier.notes || "No additional notes" }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Added On
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ formatDate(currentSupplier.dateAdded) }}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Last Updated
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                        {{ formatDate(currentSupplier.lastUpdated) }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
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

    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
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
                  Delete Supplier
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete "{{
                      currentSupplier.name
                    }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="deleteSupplier"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
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
import { ref, computed, watchEffect } from "vue";

// Sample data for suppliers
const suppliers = ref([
  {
    id: 1,
    name: "Coffee Bean Imports Ltd",
    category: "food",
    contactName: "Maria Rodriguez",
    phone: "+1 (555) 123-4567",
    email: "maria@coffeebeanltd.com",
    address: "123 Bean Street, Suite 400",
    city: "Seattle",
    country: "USA",
    status: "active",
    notes:
      "Premium coffee bean supplier. Orders typically arrive within 5 business days.",
    dateAdded: new Date("2022-08-15"),
    lastUpdated: new Date("2023-01-20"),
  },
  {
    id: 2,
    name: "EcoPack Solutions",
    category: "packaging",
    contactName: "David Chen",
    phone: "+1 (555) 987-6543",
    email: "david@ecopack.com",
    address: "456 Green Way",
    city: "Portland",
    country: "USA",
    status: "active",
    notes:
      "Eco-friendly packaging materials. Minimum order quantity: 1000 units.",
    dateAdded: new Date("2022-09-10"),
    lastUpdated: new Date("2023-02-05"),
  },
  {
    id: 3,
    name: "Barista Pro Equipment",
    category: "equipment",
    contactName: "James Wilson",
    phone: "+1 (555) 456-7890",
    email: "james@baristapro.com",
    address: "789 Espresso Lane",
    city: "Chicago",
    country: "USA",
    status: "active",
    notes: "Professional coffee equipment and maintenance services.",
    dateAdded: new Date("2022-07-22"),
    lastUpdated: new Date("2023-03-15"),
  },
  {
    id: 4,
    name: "Sweet Treats Bakery",
    category: "food",
    contactName: "Emily Johnson",
    phone: "+1 (555) 234-5678",
    email: "emily@sweettreatsbakery.com",
    address: "101 Pastry Blvd",
    city: "Boston",
    country: "USA",
    status: "pending",
    notes: "Provides fresh pastries daily. Requires 48-hour advance orders.",
    dateAdded: new Date("2022-11-05"),
    lastUpdated: new Date("2022-11-05"),
  },
  {
    id: 5,
    name: "Merch Masters",
    category: "merchandise",
    contactName: "Alex Brown",
    phone: "+1 (555) 345-6789",
    email: "alex@merchmasters.com",
    address: "222 Brand Street",
    city: "Los Angeles",
    country: "USA",
    status: "inactive",
    notes:
      "Custom branded merchandise supplier. Currently on hold due to quality issues.",
    dateAdded: new Date("2022-06-15"),
    lastUpdated: new Date("2023-01-10"),
  },
]);

// Search and filter
const searchQuery = ref("");
const categoryFilter = ref("");
const sortBy = ref("name");
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modals
const isModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const currentSupplier = ref({
  id: null,
  name: "",
  category: "food",
  contactName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  country: "",
  status: "active",
  notes: "",
  dateAdded: new Date(),
  lastUpdated: new Date(),
});

const filteredSuppliers = computed(() => {
  let result = [...suppliers.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.contactName.toLowerCase().includes(query) ||
        supplier.city.toLowerCase().includes(query) ||
        supplier.country.toLowerCase().includes(query)
    );
  }

  if (categoryFilter.value) {
    result = result.filter(
      (supplier) => supplier.category === categoryFilter.value
    );
  }

  result.sort((a, b) => {
    if (sortBy.value === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === "location") {
      return a.city.localeCompare(b.city) || a.country.localeCompare(b.country);
    } else if (sortBy.value === "date") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    return 0;
  });

  return result;
});

const paginationStart = computed(() => {
  return Math.min(
    (currentPage.value - 1) * itemsPerPage.value + 1,
    filteredSuppliers.value.length
  );
});

const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredSuppliers.value.length
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredSuppliers.value.length / itemsPerPage.value) || 1;
});

watchEffect(() => {
  if (searchQuery.value || categoryFilter.value) {
    currentPage.value = 1;
  }
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
      return category;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  currentSupplier.value = {
    id: null,
    name: "",
    category: "food",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    status: "active",
    notes: "",
    dateAdded: new Date(),
    lastUpdated: new Date(),
  };
  isModalOpen.value = true;
};

const editSupplier = (supplier) => {
  isEditing.value = true;
  currentSupplier.value = { ...supplier };
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
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const saveSupplier = () => {
  const now = new Date();

  if (isEditing.value) {
    const index = suppliers.value.findIndex(
      (s) => s.id === currentSupplier.value.id
    );
    if (index !== -1) {
      suppliers.value[index] = {
        ...currentSupplier.value,
        lastUpdated: now,
      };
    }
  } else {
    const newId =
      Math.max(...suppliers.value.map((supplier) => supplier.id), 0) + 1;
    suppliers.value.push({
      ...currentSupplier.value,
      id: newId,
      dateAdded: now,
      lastUpdated: now,
    });
  }
  closeModal();
};

const deleteSupplier = () => {
  const index = suppliers.value.findIndex(
    (s) => s.id === currentSupplier.value.id
  );
  if (index !== -1) {
    suppliers.value.splice(index, 1);
  }
  closeDeleteModal();
};
</script>

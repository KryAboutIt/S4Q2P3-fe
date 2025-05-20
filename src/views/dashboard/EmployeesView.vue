<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
        Employees Management
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
        <span>Add Employee</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative col-span-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search employees..."
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
          v-model="roleFilter"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="">All Roles</option>
          <option value="0">Manager</option>
          <option value="1">Cashier</option>
          <option value="2">Supplier</option>
        </select>
        <select
          v-model="sortBy"
          class="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary cursor-pointer"
        >
          <option value="name">Sort by Name</option>
          <option value="role">Sort by Role</option>
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
                Employee
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Role
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
                  Loading employees...
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="px-6 py-4 text-center text-red-500">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="filteredEmployees.length === 0 && !isLoading">
              <td
                colspan="5"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No employees found matching your criteria
              </td>
            </tr>
            <tr
              v-else
              v-for="employee in filteredEmployees"
              :key="employee.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    {{
                      getInitials(
                        employee.first_name + " " + employee.last_name
                      )
                    }}
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ employee.first_name }} {{ employee.last_name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ employee.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                      employee.role === 0,
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                      employee.role === 1,
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      employee.role === 2,
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200':
                      employee.role === 3,
                  }"
                >
                  {{ getRoleLabel(employee.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ employee.phone }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ employee.company_name || "N/A" }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ getShortAddress(employee.address) }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="viewEmployee(employee)"
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
                  @click="editEmployee(employee)"
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
                  @click="confirmDelete(employee)"
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
              <span class="font-medium">{{ totalEmployees }}</span>
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
            @submit.prevent="saveEmployee"
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
                    {{ isEditing ? "Edit Employee" : "Add New Employee" }}
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
                          v-model="currentEmployee.first_name"
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
                          v-model="currentEmployee.last_name"
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
                        v-model="currentEmployee.email"
                        type="email"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="role"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Role</label
                      >
                      <select
                        id="role"
                        v-model="currentEmployee.role"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="0">Manager</option>
                        <option value="1">Cashier</option>
                        <option value="2">Supplier</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Phone Number</label
                      >
                      <input
                        id="phone"
                        v-model="currentEmployee.phone"
                        type="text"
                        class="mt-1 px-3 py-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="company_name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Company Name</label
                      >
                      <input
                        id="company_name"
                        v-model="currentEmployee.company_name"
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
                        v-model="currentEmployee.gender"
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
                        v-model="currentEmployee.address"
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
            <div
              class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0"
            >
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
                    : "Create Employee"
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
          <div class="max-h-[calc(100vh-8rem)] flex flex-col">
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto"
            >
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    Employee Details
                  </h3>
                  <div class="mt-4">
                    <div class="flex justify-center mb-5">
                      <div
                        class="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl"
                      >
                        {{
                          getInitials(
                            currentEmployee.first_name +
                              " " +
                              currentEmployee.last_name
                          )
                        }}
                      </div>
                    </div>
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      <div class="sm:col-span-2">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Name
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 dark:text-white font-medium"
                        >
                          {{ currentEmployee.first_name }}
                          {{ currentEmployee.last_name }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Role
                        </dt>
                        <dd class="mt-1">
                          <span
                            class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="{
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                                currentEmployee.role === 0,
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                                currentEmployee.role === 1,
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                                currentEmployee.role === 2,
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200':
                                currentEmployee.role === 3,
                            }"
                          >
                            {{ getRoleLabel(currentEmployee.role) }}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Gender
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.gender === 0 ? "Male" : "Female" }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Email
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.email }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Phone
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.phone }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Company
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.company_name || "N/A" }}
                        </dd>
                      </div>
                      <div class="sm:col-span-2">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.address }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Account Created
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentEmployee.created_at) }}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Last Updated
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ formatDate(currentEmployee.updated_at) }}
                        </dd>
                      </div>
                      <div v-if="currentEmployee.role === 3">
                        <dt
                          class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Points
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                          {{ currentEmployee.point }}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-shrink-0"
            >
              <button
                type="button"
                @click="editEmployee(currentEmployee)"
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
                  Delete Employee Account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete the account for "{{
                      currentEmployee.first_name +
                      " " +
                      currentEmployee.last_name
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
              @click="deleteEmployee"
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

const employees = ref([]);
const totalEmployees = ref(0);
const isLoading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const roleFilter = ref("");
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
const currentEmployee = ref({
  id: null,
  role: 2,
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

const fetchEmployees = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    let column = "first_name";
    if (sortBy.value === "role") column = "role";
    if (sortBy.value === "date") column = "created_at";

    const params = {
      limit: itemsPerPage.value,
      page: currentPage.value,
      column: column,
      direction: sortDirection.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    if (roleFilter.value !== "") {
      params.role = roleFilter.value;
    }

    const response = await apiService.getUsers(params);

    if (response.data && response.data.data) {
      const nonCustomerEmployees = response.data.data.data.filter(
        employee => parseInt(employee.role) !== 3
      );
      
      employees.value = nonCustomerEmployees;
      
      if (currentPage.value === 1) {
        const ratio = nonCustomerEmployees.length / response.data.data.data.length;
        totalEmployees.value = Math.floor(response.data.data.total * ratio);
        
        if (totalEmployees.value < nonCustomerEmployees.length) {
          totalEmployees.value = nonCustomerEmployees.length;
        }
      }
      
      if (currentPage.value > 1 && nonCustomerEmployees.length < itemsPerPage.value) {
        totalEmployees.value = (currentPage.value - 1) * itemsPerPage.value + nonCustomerEmployees.length;
      }
      
      currentPage.value = response.data.data.current_page;
      totalPages.value = Math.max(1, Math.ceil(totalEmployees.value / itemsPerPage.value));
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (err) {
    console.error("Failed to fetch employees:", err);
    error.value = "Failed to load employees. Please try again.";
    employees.value = [];
    totalPages.value = 1;
    totalEmployees.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const createEmployee = async () => {
  if (!validateEmployeeForm()) return;

  isSaving.value = true;

  try {
    const employeeData = {
      ...currentEmployee.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    };

    await apiService.createUser(employeeData);
    closeModal();
    fetchEmployees();
  } catch (err) {
    console.error("Failed to create employee:", err);
    alert("Failed to create employee. Please try again.");
  } finally {
    isSaving.value = false;
  }
};

const updateEmployee = async () => {
  if (!validateEmployeeForm(true)) return;

  isSaving.value = true;

  try {
    const employeeData = { ...currentEmployee.value };

    if (password.value) {
      employeeData.password = password.value;
      employeeData.password_confirmation = passwordConfirmation.value;
    }

    await apiService.updateUser(currentEmployee.value.id, employeeData);
    closeModal();
    fetchEmployees();
  } catch (err) {
    console.error("Failed to update employee:", err);
    alert("Failed to update employee. Please try again.");
  } finally {
    isSaving.value = false;
  }
};

const deleteEmployee = async () => {
  isDeleting.value = true;

  try {
    await apiService.deleteUser(currentEmployee.value.id);
    closeDeleteModal();
    fetchEmployees();
  } catch (err) {
    console.error("Failed to delete employee:", err);
    alert("Failed to delete employee. It may be referenced by other records.");
  } finally {
    isDeleting.value = false;
  }
};

const validateEmployeeForm = (isEdit = false) => {
  if (!currentEmployee.value.first_name) {
    alert("First name is required");
    return false;
  }

  if (!currentEmployee.value.email) {
    alert("Email is required");
    return false;
  }
  
  if (currentEmployee.value.phone) {
    const phoneDigits = currentEmployee.value.phone.replace(/\D/g, '');
    
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      alert("Phone number must be between 10 and 13 digits");
      return false;
    }
  }

  if (!isEdit && !password.value) {
    alert("Password is required for new employees");
    return false;
  }

  if (password.value && password.value !== passwordConfirmation.value) {
    alert("Passwords do not match");
    return false;
  }

  return true;
};

const saveEmployee = () => {
  if (isEditing.value) {
    updateEmployee();
  } else {
    createEmployee();
  }
};

const filteredEmployees = computed(() => {
  if (isLoading.value) {
    return [];
  }
  
  let filtered = employees.value;
  
  if (roleFilter.value !== "") {
    filtered = filtered.filter(
      employee => String(employee.role) === roleFilter.value
    );
  }
  
  return filtered;
});

const paginationStart = computed(() => {
  if (filteredEmployees.value.length === 0) return 0;
  return 1 + (currentPage.value - 1) * itemsPerPage.value;
});

const paginationEnd = computed(() => {
  if (filteredEmployees.value.length === 0) return 0;
  return paginationStart.value + filteredEmployees.value.length - 1;
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

const getRoleLabel = (role) => {
  switch (parseInt(role)) {
    case 0: return "Manager";
    case 1: return "Cashier";
    case 2: return "Supplier";
    case 3: return "Customer";
    default: return "Unknown";
  }
};

const getShortAddress = (address) => {
  if (!address) return "";
  const firstLine = address.split("\n")[0];
  return firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine;
};

const openCreateModal = () => {
  isEditing.value = false;
  currentEmployee.value = {
    id: null,
    role: 1,
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

const editEmployee = (employee) => {
  isEditing.value = true;
  currentEmployee.value = { ...employee };
  currentEmployee.value.role = parseInt(currentEmployee.value.role);
  currentEmployee.value.gender = parseInt(currentEmployee.value.gender);
  password.value = "";
  passwordConfirmation.value = "";
  isViewModalOpen.value = false;
  isModalOpen.value = true;
};

const viewEmployee = (employee) => {
  currentEmployee.value = { ...employee };
  isViewModalOpen.value = true;
};

const confirmDelete = (employee) => {
  currentEmployee.value = { ...employee };
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

const addApiMethods = () => {
  if (!apiService.createUser) {
    apiService.createUser = (userData) => {
      return apiService.post("/users", userData);
    };
  }

  if (!apiService.updateUser) {
    apiService.updateUser = (id, userData) => {
      return apiService.put(`/users/${id}`, userData);
    };
  }

  if (!apiService.deleteUser) {
    apiService.deleteUser = (id) => {
      return apiService.delete(`/users/${id}`);
    };
  }
};

watch([searchQuery, roleFilter], () => {
  currentPage.value = 1;
  fetchEmployees();
});

watch([sortBy, sortDirection], () => {
  fetchEmployees();
});

watch(currentPage, () => {
  fetchEmployees();
});

// Lifecycle hooks
onMounted(() => {
  addApiMethods();
  fetchEmployees();
});
</script>

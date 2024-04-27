<style scoped>
#FAQAccordion .accordion-button {
  background-color: #aba6d5;
}

#FAQAccordion .accordion-button:focus {
  outline: none;
  box-shadow: none;
}
</style>

<template>
  <div class="accordion" id="FAQAccordion">
    <div
      v-for="(question, index) in [
        {
          title: 'Do we sell or buy books?',
          summary: 'No, we don\'t.',
          answer:
            'Our application facilitates the process of obtaining the works but we are not responsible for anything related to it.'
        },
        {
          title: 'How can I delete my entire list / several entries at once?',
          summary: 'You have to delete every entry manually.',
          answer:
            'The feature for deleting the entire list has been removed due to performance issues. Currently you have to delete every entry manually.'
        },
        {
          title:
            'I have changed the status of a work and the list of where it was was incorrectly updated',
          summary: 'You just have to refresh the page',
          answer:
            'We are still working on the application so it is possible that these things happen. Sorry for the inconvenience and for now use that quick trick.'
        }
      ]"
      :key="index"
      class="accordion-item"
    >
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed w-100 d-flex flex-column gap-1"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#question' + index"
          aria-expanded="false"
          aria-controls="faq"
        >
          <span class="w-100">{{ question.title }}</span>
          <div class="w-100">
            <span class="me-1">{{ question.summary }}</span>
            <small><u>Learn more</u></small>
          </div>
        </button>
      </h2>

      <div
        :id="'question' + index"
        class="accordion-collapse collapse"
        data-bs-parent="#FAQAccordion"
      >
        <div class="accordion-body">
          {{ question.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

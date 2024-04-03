<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="container-fluid pt-4 mt-auto">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>Contact Us</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2">
            <a href="mailto:mybooklist@gmail.com" class="nav-link p-0 text-reset">
              mybooklist@gmail.com
            </a>
          </li>
          <li class="nav-item mb-2">
            <a href="tel:+34 999 999 99" class="nav-link p-0 text-reset"> +34 999 999 99 </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row text-center d-flex justify-content-center py-2">
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'about'}" class="text-reset text-decoration-none">About Us</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'legal-conditions'}" class="text-reset text-decoration-none">Legal Conditions</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'privacy-policy'}" class="text-reset text-decoration-none">Privacy Policy</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'help'}" class="text-reset text-decoration-none">Help</router-link>
        </h6>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between pt-4 border-top border-dark">
      <p>&copy; 2022 Company, Inc. All rights reserved.</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/twitter-icon.svg" alt="Twitter" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/instagram-icon.svg" alt="Instagram" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/facebook-icon.svg" alt="Facebook" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/tiktok-icon.svg" alt="Tiktok" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
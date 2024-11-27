<template>
  <div
    class="flex flex-col gap-2 w-full border border-bg_lightgray rounded-lg p-4 h-fit"
  >
    <h3 class="font-bold text-textColor text-xl">
      {{ room?.roomReferences[0]?.roomData?.name }}
    </h3>
    <div class="flex items-center gap-1">
      <img
        class="h-6 w-auto"
        :src="room?.roomReferences[0]?.roomData?.boardBasis?.icon"
      />
      <div class="text-textColor text-sm">
        {{ room?.roomReferences[0]?.roomData?.boardBasis?.label }}
      </div>
    </div>

    <!-- <div class="flex items-center gap-2">
      <IconDiner color="#765cf1" />
      <span class="text-primary text-sm">شامل إفطار وعشاء</span>
    </div> -->

    <!-- <div class="flex items-center gap-2">
      <IconSpa color="#765cf1" />
      <span class="text-primary text-sm">سبا ومركز صحي</span>
    </div> -->

    <div
      class="flex items-center gap-2"
      v-if="room?.roomReferences[0]?.roomData?.nonRefundable"
    >
      <IconDot />
      <span class="text-error text-sm">{{ $t("content.nonRefundable") }}</span>
      <PolicyModal />
    </div>

    <div class="flex items-center gap-2" v-else>
      <IconDot color="#177a1f" />
      <span class="text-green text-sm">{{
        $t("price_packages.refundable")
      }}</span>
      <PolicyModal />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-textColor text-sm flex items-center gap-1">
        <span class="font-bold"> {{ $t("content.thGuests") }} : </span>
        <div class="flex items-center gap-1">
          <span>{{ getAdultLabel(room?.occupancy.adults, $t) }} </span>
          <span v-if="room?.occupancy.childrenAges.length >= 1">
            ,
            {{
              getChildrenLabel(room?.occupancy.childrenAges.length, $t)
            }}</span
          >
          <span v-if="room?.occupancy.childrenAges.length >= 1">
            (<span
              v-for="(child, index) in room?.occupancy.childrenAges"
              :key="index"
              >{{ child }}
              <span v-if="index + 1 !== room?.occupancy.childrenAges.length">
                ,
              </span></span
            >
            {{ $t("age.years") }})
          </span>
        </div>
      </span>
    </div>

    <!-- $$$$$$$$$$$$$$$$$$$$ -->
    <div
      class="flex flex-col gap-2 border border-bg_lightgray border-l-0 border-b-0 border-r-0 py-4 mt-4"
    >
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <div class="custom-radio">
            <input
              type="radio"
              :id="`man_${index}`"
              :name="`genderSelection_${index}`"
              v-model="title"
              value="mr"
            />
            <label :for="`man_${index}`" class="checkmark"></label>
          </div>
          <label
            for="man"
            class="md:text-base text-sm text-textColor flex items-center gap-2"
          >
            {{ $t("content.man") }}
          </label>
        </div>
        <div class="flex items-center gap-2">
          <div class="custom-radio">
            <input
              type="radio"
              :id="`woman_${index}`"
              :name="`genderSelection_${index}`"
              v-model="title"
              value="mss"
            />
            <label :for="`woman_${index}`" class="checkmark"></label>
          </div>
          <label
            for="woman"
            class="md:text-base text-sm text-textColor flex items-center gap-2"
          >
            {{ $t("content.woman") }}
          </label>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <span class="text-textColor font-bold md:text-base text-sm">{{
              $t("content.first_name")
            }}</span>
            <span class="text-error font-bold md:text-base text-sm">*</span>
          </div>

          <Input
            type="text"
            :placeholder="$t('content.first_name')"
            v-model="firstName"
            :class="[
              'border focus-visible:ring-0',
              errors.firstName
                ? 'border-error'
                : firstName
                ? 'border-lightgreen_color'
                : 'border-bg_lightgray',
            ]"
            @change="validateGuest"
          />
          <span v-if="errors?.firstName" class="text-error text-xs">{{
            $t("errors.required")
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <span class="text-textColor font-bold md:text-base text-sm">{{
              $t("content.last_name")
            }}</span>
            <span class="text-error font-bold md:text-base text-sm">*</span>
          </div>

          <Input
            type="text"
            :placeholder="$t('content.last_name')"
            v-model="lastName"
            :class="[
              'border focus-visible:ring-0',
              errors.lastName
                ? 'border-error'
                : lastName
                ? 'border-lightgreen_color'
                : 'border-bg_lightgray',
            ]"
            @change="validateGuest"
          />
          <span v-if="errors?.lastName" class="text-error text-xs">{{
            $t("errors.required")
          }}</span>
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-1 w-full">
        <span class="text-textColor font-bold md:text-base text-sm">{{
          $t("content.guestEmail")
        }}</span>
        <Input
          type="email"
          :placeholder="$t('content.email_placeholder')"
          v-model="guestMail"
          :class="[
            'border focus-visible:ring-0 w-full',
            errors.guestMail
              ? 'border-error'
              : guestMail && !errors.guestMail
              ? 'border-lightgreen_color'
              : 'border-bg_lightgray',
          ]"
          @change="validateGuest"
        />
        <span v-if="errors?.guestMail" class="text-error text-xs"
          >{{ $t('errors.invalid_email') }}</span
        >
      </div>
    </div>

    <!-- <div
      class="flex flex-col gap-2 border border-bg_lightgray border-l-0 border-b-0 border-r-0 py-4 mt-4"
    >
      <span><b>اختر سريرك </b>(إن وجد):</span>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div class="custom-radio">
            <input
              type="radio"
              :id="`man_${index}`"
              :name="`genderSelection_${index}`"
              v-model="title"
              value="man"
            />
            <label :for="`man_${index}`" class="checkmark"></label>
          </div>
          <label
            for="man"
            class="md:text-base text-sm text-textColor flex items-center gap-2"
          >
            <span>1 سرير مزدوج كبير جداً</span>
            <IconBed color="#3D3D3D" />
          </label>
        </div>
        <div class="flex items-center gap-2">
          <div class="custom-radio">
            <input
              type="radio"
              :id="`woman_${index}`"
              :name="`genderSelection_${index}`"
              v-model="title"
              value="woman"
            />
            <label :for="`woman_${index}`" class="checkmark"></label>
          </div>
          <label
            for="woman"
            class="md:text-base text-sm text-textColor flex items-center gap-2"
          >
            <span>2 سرير فردي</span>
            <IconBed color="#3D3D3D" />
            <IconBed color="#3D3D3D" />
          </label>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import PolicyModal from "./PolicyModal";
import IconDot from "../icon/IconDot.vue";
import { Input } from "@/components/ui/input";
import { getChildrenLabel, getAdultLabel } from "@/lib/utils";
import { object } from "zod";

const emit = defineEmits(["guestDataChange", "validationStatus"]);

const props = defineProps({
  room: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    required: true,
  },
});

// Refs for form data
const firstName = ref("");
const lastName = ref("");
const guestMail = ref("");
const title = ref("mr");

// Refs for form validation
const errors = ref({
  firstName: false,
  lastName: false,
  guestMail: false,
});

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Watch the form data and emit changes
watch([firstName, lastName, guestMail, title], () => {
  emit("guestDataChange", {
    travelers: [
      {
        firstName: firstName.value,
        lastName: lastName.value,
        title: title.value,
        reference: (props.index + 1).toString(),
        type: "adult",
        lead: props.index == 0 ? true : false,
      },
    ],
    packageRoomToken: props.room?.roomReferences[0].roomToken,
  });

  validateGuest();
});

const validateGuest = () => {
  let valid = true;

  if (!firstName.value.trim()) {
    errors.value.firstName = true;
    valid = false;
  } else {
    errors.value.firstName = false;
  }

  if (!lastName.value.trim()) {
    errors.value.lastName = true;
    valid = false;
  } else {
    errors.value.lastName = false;
  }

  if (guestMail.value && !validateEmail(guestMail.value)) {
    errors.value.guestMail = true;
    valid = false;
  } else {
    errors.value.guestMail = false;
  }

  emit("validationStatus", valid);
};
</script>

<style scoped>
.custom-radio {
  position: relative;
  display: flex;
}

.custom-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio .checkmark {
  position: relative;
  height: 16px;
  width: 16px;
  background-color: #fff;
  border: 2px solid #765cf1; /* Customize border color */
  border-radius: 50%;
}

.custom-radio input:checked ~ .checkmark {
  background-color: #765cf1; /* Customize checked background color */
  border: 2px solid #765cf1;
}

.custom-radio .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-radio input:checked ~ .checkmark:after {
  display: block;
}

.custom-radio .checkmark:after {
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white; /* Customize checkmark inside color */
  transform: translate(-50%, -50%);
}
</style>

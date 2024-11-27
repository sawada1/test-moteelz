<script setup>
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import IconCalendar from "../icon/IconCalendar";
import { ref, h } from "vue";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

// Form schema validation
const formSchema = toTypedSchema(
  z.object({
    bookingNumber: z.string().optional(),
    bookingDate: z.string().optional(),
    travelDate: z.string().optional(),
    passengerName: z.string().optional(),
    status: z.enum(["1", "2", "3"]).optional(),
  })
);

// Form logic
const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
});

// Date formatting for display
const df = new DateFormatter("en-US", { dateStyle: "medium" });
const bookingDate = ref();
const travelDate = ref();
const bookingNumber = ref();
const passengerName = ref();
const status = ref();

// Submit handler
const onSubmit = handleSubmit(() => {
  // Add bookingDate and travelDate to values object
  const submittedValues = {
    bookingNumber: bookingNumber ? bookingNumber.value : null,
    passengerName: passengerName ? passengerName.value : null,
    status: status ? status.value : null,
    bookingDate: bookingDate.value
      ? df.format(bookingDate.value.toDate(getLocalTimeZone()))
      : null,
    travelDate: travelDate.value
      ? df.format(travelDate.value.toDate(getLocalTimeZone()))
      : null,
  };

  // Validate if at least one input has a value
  if (
    !submittedValues.bookingNumber &&
    !submittedValues.bookingDate &&
    !submittedValues.travelDate &&
    !submittedValues.passengerName &&
    !submittedValues.status
  ) {
    toast({
      variant: "destructive",
      title: "عذرًا! حدث خطأ.",
      description: "لا يمكنك بدء البحث دون إدخال البيانات.",
    });
  } else {
    console.log(submittedValues);
    toast({
      title: "Form Submitted",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h(
          "code",
          { class: "text-white" },
          JSON.stringify(submittedValues, null, 2)
        )
      ),
    });
  }
});
</script>

<template>
  <div class="w-full border border-borderLightColor rounded-lg p-4">
    <form class="w-full flex flex-col md:flex-row items-center gap-4" @submit.prevent="onSubmit">
      <div class="grid md:grid-cols-5 grid-cols-2 gap-4 w-full">
        <!-- Booking Number -->
        <FormField name="bookingNumber">
          <FormItem>
            <FormControl>
              <Input
                v-model="bookingNumber"
                type="text"
                placeholder="رقم الحجز"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Booking Date (Calendar) -->
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="text-left justify-start flex items-center gap-1"
            >
              <span class="flex-none"><IconCalendar /></span>
              <span>
                <span class="text-primary text-xs">
                  {{
                    bookingDate
                      ? df.format(bookingDate.toDate(getLocalTimeZone()))
                      : ""
                  }}
                </span>
                <span v-if="!bookingDate" class="text-textLightGray"
                  >تاريخ الحجز</span
                >
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar v-model="bookingDate" />
          </PopoverContent>
        </Popover>

        <!-- Travel Date (Calendar) -->
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="text-left justify-start flex items-center gap-1"
            >
              <span class="flex-none"><IconCalendar /></span>

              <span>
                <span class="text-primary text-xs">
                  {{
                    travelDate
                      ? df.format(travelDate.toDate(getLocalTimeZone()))
                      : ""
                  }}
                </span>
                <span v-if="!travelDate" class="text-textLightGray"
                  >تاريخ السفر</span
                >
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar v-model="travelDate" />
          </PopoverContent>
        </Popover>

        <!-- Passenger Name -->
        <FormField name="passengerName">
          <FormItem>
            <FormControl>
              <Input
                v-model="passengerName"
                type="text"
                placeholder="اسم المسافر"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Status -->
        <FormField name="status">
          <Select v-model="status">
            <SelectTrigger>
              <SelectValue class="text-textLightGray w-full text-end px-2" placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent class="text-start">
              <SelectGroup>
                <SelectItem value="1">مؤكده</SelectItem>
                <SelectItem value="2">ملغيه</SelectItem>
                <SelectItem value="3">قيد الانتظار</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <!-- Submit Button -->
      <Button type="submit" class="text-white md:w-fit w-full">بحث</Button>
    </form>
    <Toaster />
  </div>
</template>

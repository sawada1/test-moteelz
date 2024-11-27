<template>
  <div class="w-full border border-borderLightColor rounded-lg p-4">
    <div class="flex md:grid md:grid-cols-4 flex-col items-center gap-4 w-full">
      <div class="h-full col-span-1">
        <img
          :src="booking.image"
          class="rounded-xl h-full w-full object-cover"
        />
      </div>
      <div class="flex flex-col gap-2 w-full col-span-3">
        <div class="flex items-center gap-2 justify-between w-full">
          <div
            class="flex gap-4 items-start md:items-center flex-col md:flex-row w-full"
          >
            <h3 class="font-bold text-primary_dark text-sm md:text-base">
              {{ booking.hotelName }}
            </h3>
            <div
              :class="[
                'rounded-full border px-4 py-1 text-xs md:text-sm',
                booking.status === 1
                  ? 'border-acceptColor'
                  : booking.status === 0
                  ? 'border-rejectedColor'
                  : 'border-waitingColor',
                  booking.status === 1
                  ? 'bg-acceptBgColor'
                  : booking.status === 0
                  ? 'bg-rejectedBgColor'
                  : 'bg-waitingBgColor',
                  booking.status === 1
                  ? 'text-acceptColor'
                  : booking.status === 0
                  ? 'text-rejectedColor'
                  : 'text-waitingColor'
              ]"
            >
              {{
                booking.status === 1
                  ? "ملغيه"
                  : booking.status === 0
                  ? "مرفوضه"
                  : "قيد الانتظار"
              }}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline"><IconDots /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                class="flex items-center gap-1 w-full justify-end cursor-pointer"
              >
                <span>{{ $t("content.print") }}</span>
                <IconPrint />
              </DropdownMenuItem>
              <DropdownMenuItem
                class="flex items-center gap-1 w-full justify-end cursor-pointer"
              >
                <span>{{ $t("content.AddToFav") }}</span>
                <IconHeart />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div class="flex items-center gap-2 text-xs md:text-sm">
          <span class="text-[#909090]"> {{ $t("content.book_code") }}:</span>
          <span class="text-textColor">{{ booking.number }}</span>
        </div>

        <div class="flex items-center gap-2 text-xs md:text-sm">
          <span class="text-[#909090]">اسم المسؤول:</span>
          <span class="text-textColor">{{ booking.responseName }}</span>
        </div>

        <div class="flex items-center gap-2 text-xs md:text-sm">
          <span class="text-[#909090]">{{ $t("content.date_of_entry") }}:</span>
          <span class="text-textColor">{{ booking.date }}</span>
        </div>

        <div class="flex justify-end">
          <span class="text-primary font-bold text-sm md:text-base"
            >{{ booking.price }} ر.س</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconDots from "../icon/IconDots";
import IconPrint from "../icon/IconPrint";
import IconHeart from "../icon/IconHeart";

// const props = defineProps({
//   bookingBgColor: {
//     type: String,
//     default: "#E8FFF3",
//   },
//   bookingBorderColor: {
//     type: String,
//     default: "#47BF39",
//   },
//   bookingStatus: {
//     type: String,
//     default: "مؤكدة",
//   },
// });
const props = defineProps({
  booking: {
    type: Object,
    require: true,
  },
});
</script>

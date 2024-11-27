<script lang="ts" setup>

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    reversDirection: {
        type: Boolean,
        default: false
    },
    btnText: {
        type: String,
    },
    imageSrc: {
        type: String
    },
    appSec: {
        type: Boolean
    },
    modalTitle: String
});


</script>

<template>
    <div
        class="grid grid-flow-row md:grid-cols-12 items-center justify-between text-center md:gap-16 space-y-10 md:space-y-0">
        <div class="col-span-6 flex flex-col gap-5 justify-start items-start">
            <span class="text-primary md:text-[22px] text-[16px] font-semibold">{{ $t(props.title) }}</span>
            <p class="text-justify md:text-lg text-[14px]">{{ $t(props.description) }}</p>
           
            <Dialog>
                <DialogTrigger as-child>
                    <Button v-if="!appSec" @click="showModal" class="md:text-lg text-sm  rounded-md text-white">{{
                $t(props.btnText) }}</Button>
                </DialogTrigger>
                <DialogContent class=" xl:max-w-[925px] lg:max-w-[925px] md:max-w-[925px] h-[600px] xl:h-[700px] lg:h-[700px] md:h-[700px]  !rounded-[38px] z-[555555555] ">
                    <div class="hidden xl:flex lg:flex md:flex h-full absolute w-[30%]  left-0">
                        <div class="image h-full  w-[100%]">
                            <NuxtImg src="/img/form-aside.png" class="h-[100%] w-[100%]"></NuxtImg>
                            <div class="content absolute z-10 top-[35%] px-2 ">
                            <NuxtImg src="/img/form-card.png" class="w-[100%]"></NuxtImg>
                                <h4 class="text-white text-[20px] text-center mt-2 font-bold"> تمتع بمحفظة خاصة لشركتك وموظفيك </h4>
                            </div>
                        </div>
                    </div>
                    <div class="custom-main-form-container overflow-y-auto w-[100%] xl:w-[70%] lg:w-[70%] md:w-[70%]">
                        <div class="main-form-container   mt-10 ">
                            <h3 class="text-[#2D3263] text-[24px] font-semibold"> اولاً: معلومات الاتصال </h3>
                            <div class="flex flex-col gap-5">
                                <div class="form-container ">
                                    <div class="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> الإسم الأول* </Label>
                                            <Input id="email" type="text" placeholder=" الإسم الأول " />
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> الإسم الأخير* </Label>
                                            <Input id="email" type="text" placeholder=" الإسم الأخير " />
                                        </div>
                                    </div>
                                    <!-- <div class=" flex items-center justify-between">
                                     <span class="text-burgundy"> dsd </span>
                                     <span class="text-burgundy"> dsd </span>
                                    </div> -->

                                </div>
                                <div class="form-container ">
                                    <div class="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> إسم الشركة*
                                            </Label>
                                            <Input id="email" type="text" placeholder=" الإسم الأول " />
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <div
                                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                شعار الشركة </div>
                                            <!-- <Input id="email" type="file" placeholder=" الإسم الأخير " /> -->
                                            <label for="logo-input"
                                                class="flex cursor-pointer h-10 w-full rounded-md border px-3 border-input bg-background  items-center text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                <div class=" w-full h-full flex items-center justify-between">
                                                    <span> قم برفع شعار الشركة هنا </span>
                                                    <IconImage></IconImage>
                                                </div>
                                                <input id="logo-input" type="file" class="hidden">
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-container ">
                                    <div class="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> الإيميل الرسمي* </Label>
                                            <Input id="email" type="text" placeholder="  الإيميل الرسمي " />
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> رقم جوال الشركة* </Label>
                                            <Input id="email" type="text" placeholder=" رقم جوال الشركة " />
                                        </div>
                                    </div>

                                </div>
                                <div class="form-container ">
                                    <div class="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> الإسم الأول* </Label>
                                            <Input id="email" type="text" placeholder=" الإسم الأول " />
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label for="email"> الإسم الأخير* </Label>
                                            <Input id="email" type="text" placeholder=" الإسم الأخير " />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="main-form-container  mt-10 ">
                            <h3 class="text-[#2D3263] text-[24px] font-semibold"> ثانياً: تفاصيل الطلب </h3>
                            <div class="flex flex-col gap-5">
                                <div class="form-container ">
                                    <div class="flex items-center flex-col xl:flex-row lg:flex-row md:flex-row gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label> إسم المحفظة </Label>
                                            <Input type="text" placeholder=" إسم المحفظة" />
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <Label> عدد الليالي:</Label>
                                            <Input type="number" min="1" placeholder=" عدد الليالي" />
                                        </div>
                                    </div>

                                </div>
                                <div class="form-container ">
                                    <div class="flex items-center flex-col xl:flex-row lg:flex-row md:flex-row gap-5 mt-5">
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <!-- <Label> إسم المحفظة </Label> -->
                                            <Select>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select a fruit" />
                                                </SelectTrigger>
                                                <SelectContent class="!z-[99999999]">
                                                    <SelectGroup>
                                                        <SelectLabel>Fruits</SelectLabel>
                                                        <SelectItem value="apple">
                                                            Apple
                                                        </SelectItem>
                                                        <SelectItem value="banana">
                                                            Banana
                                                        </SelectItem>
                                                        <SelectItem value="blueberry">
                                                            Blueberry
                                                        </SelectItem>
                                                        <SelectItem value="grapes">
                                                            Grapes
                                                        </SelectItem>
                                                        <SelectItem value="pineapple">
                                                            Pineapple
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div class="grid  items-center w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] gap-1.5">
                                            <!-- <Label> عدد الليالي:</Label> -->
                                            <Select>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select a fruit" />
                                                </SelectTrigger>
                                                <SelectContent class="!z-[99999999]">
                                                    <SelectGroup>
                                                        <SelectLabel>Fruits</SelectLabel>
                                                        <SelectItem value="apple">
                                                            Apple
                                                        </SelectItem>
                                                        <SelectItem value="banana">
                                                            Banana
                                                        </SelectItem>
                                                        <SelectItem value="blueberry">
                                                            Blueberry
                                                        </SelectItem>
                                                        <SelectItem value="grapes">
                                                            Grapes
                                                        </SelectItem>
                                                        <SelectItem value="pineapple">
                                                            Pineapple
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <DialogClose class=" w-full flex items-center justify-center" as-child>
                   <div class="flex items-center w-[50%] justify-center">
                    <Button class="text-white px-12 mt-5"> ارسال </Button>
                   </div>
          </DialogClose>
                    </div>


                </DialogContent>
            </Dialog>
            <div v-show="appSec" class="flex flex-row">
                <NuxtLink>
                    <NuxtImg width="150" src="/img/business/app-store-badge.png" />
                </NuxtLink>
                <NuxtLink>
                    <NuxtImg width="150" src="/img/business/google-play-badge.png" />
                </NuxtLink>
            </div>
        </div>

        <div class="col-span-6 flex " :class="reversDirection ? 'md:order-first' : 'md:order-2 justify-end items-end'">
            <NuxtImg class="!object-contain drop-shadow-xl md:h-[20rem] w-fit h-[70%] md:mx-0 mx-auto" :src="imageSrc">
            </NuxtImg>

        </div>
    </div>

</template>
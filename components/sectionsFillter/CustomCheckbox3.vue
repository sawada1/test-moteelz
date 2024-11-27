<template>
  <!-- <label class="custom-checkbox flex items-center space-x-2">
    <input type="checkbox" :checked="isChecked" @change="handleChange" class="hidden-checkbox">
    <span class="checkmark">
      <NuxtImg
        src="/img/check-mark.png"
      />
    </span>
    <span class="text-[#383838] text-[16px]">{{ label }}</span>
  </label> -->
  <label class="custom-checkbox2 flex items-center space-x-2" :class="{'!border-dashed !border-[#875FFF] !bg-[#F1EDFF]': isChecked}">
    <input type="checkbox" :checked="isChecked" @change="handleChange" class="hidden-checkbox">
    <span class="checkmark">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_507_2358)">
        <path d="M7.99621 11.3218C7.23149 11.3218 6.60938 11.9419 6.60938 12.7037C6.60938 13.4658 7.23149 14.0862 7.99621 14.0862C8.76118 14.0862 9.3833 13.4658 9.3833 12.7037C9.3833 11.9419 8.76105 11.3218 7.99621 11.3218Z" fill="#875FFF"/>
        <path d="M11.3804 9.43897C10.4775 8.53658 9.27567 8.03939 7.99673 8.03939C6.72271 8.03939 5.52415 8.5333 4.62151 9.43001C4.25694 9.79281 4.25631 10.3839 4.61999 10.7473C4.79666 10.9242 5.03188 11.0214 5.28224 11.0214C5.53147 11.0214 5.7658 10.9247 5.94222 10.7493C6.49153 10.2034 7.22116 9.90272 7.99673 9.90272C8.7752 9.90272 9.50685 10.2053 10.0565 10.7545C10.2332 10.9309 10.4683 11.0283 10.7184 11.0283C10.9679 11.0283 11.2021 10.9317 11.3786 10.7563C11.7437 10.3934 11.7443 9.80265 11.3804 9.43897Z" fill="#875FFF"/>
        <path d="M15.7269 5.10669C13.6627 3.04754 10.9171 1.91384 7.99658 1.91384C5.07993 1.91384 2.33718 3.04489 0.273581 5.09915C-0.0909834 5.46194 -0.0912358 6.05302 0.273077 6.41645C0.449617 6.59249 0.684458 6.68928 0.934316 6.68928C1.18405 6.68928 1.41864 6.59286 1.59518 6.41696C3.30569 4.71439 5.57902 3.77654 7.99658 3.77654C10.4177 3.77654 12.6933 4.71628 14.4042 6.42339C14.5807 6.59955 14.8159 6.69672 15.0657 6.69672C15.3153 6.69672 15.5498 6.59981 15.7263 6.42415C16.091 6.06107 16.0913 5.46977 15.7269 5.10669Z" fill="#875FFF"/>
        <path d="M13.4979 7.32712C12.0285 5.86117 10.0746 5.05392 7.99597 5.05392C5.92114 5.05392 3.97011 5.85864 2.502 7.31943C2.32521 7.49521 2.22792 7.72904 2.22754 7.97801C2.22754 8.22674 2.32445 8.46082 2.50099 8.63686C2.67753 8.81302 2.9125 8.91019 3.16236 8.91019C3.41184 8.91019 3.64643 8.81327 3.82322 8.63787C4.93849 7.52827 6.42048 6.917 7.99597 6.917C9.57474 6.917 11.0587 7.53042 12.1748 8.6438C12.3516 8.82021 12.5864 8.91738 12.8364 8.91738C13.086 8.91738 13.3207 8.82046 13.497 8.64481C13.6735 8.46902 13.7711 8.23519 13.7712 7.98622C13.7715 7.73724 13.6743 7.50341 13.4979 7.32712Z" fill="#875FFF"/>
        </g>
        <defs>
        <clipPath id="clip0_507_2358">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>        
    </span>
    <span class="label #383838 text-[16px]">{{ label }}</span>
  </label>
  <!-- <label class="custom-checkbox3 flex items-center space-x-2" :class="{'!border-dashed border !border-[#875FFF] !bg-[#F1EDFF]': isChecked}">
    <input type="checkbox" :checked="isChecked" @change="handleChange" class="hidden-checkbox">
    <span class="checkmark">
      <NuxtImg
        src="https://s3-alpha-sig.figma.com/img/1069/9011/a11349ff5119ac4f6c6b244104dd847d?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jO3TDT~kATNCng73BZwedSU~220TaSRXjjUb1I165Tbw1vk5hpoj1EPxuOR4KiEatkYL03PmD4UQoO9QK26eM3uCfk7PmnJJOdvfOPYvorhJkWs2R8CczDbfhuXNyOI7Kma7EybGTcWAbwORwF9eWOGLY2baN4o2BhHfuouT4JLB21EUXytyuLFZ6pMbMbHEEod6QB9TdBMFSrK438FoarlVT74JbSmSFUhyXig0ml~EDJ9EYm~68hXmYfkvIhLkZt8ZgKLf2ymv2lY2RFsOdC4GcqHwUxUWEX2GKDAJZ2NL-ZSDVTRFe2cnN3f2krleFcP7EolragvvqL4SzennmQ__"
      />   
    </span>
    <span class="label #383838 text-[16px]">{{ label }}</span>
  </label> -->
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import { useFilterUnits } from '~/stores/hotels/filter'

const filterStore = useFilterUnits()

const props = defineProps({
  label: String,
  value: [String, Number, Boolean],
  modelValue: Array,
  name: String
});

const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
  return filterStore.filter.checked_filter.includes(props.value);
});

const handleChange = (event) => {
  const checked = event.target.checked;
  const value = props.value;
  let updatedModelValue = [...props.modelValue];

  if (checked) {
    // إذا كانت checkbox غير مفعلة، أضف القيمة
    if (!filterStore.filter.checked_filter.includes(value)) {
      filterStore.filter.checked_filter.push(value);
      updatedModelValue.push(value);
    }
  } else {
    // إذا كانت checkbox مفعلة، أزل القيمة
    const index = filterStore.filter.checked_filter.indexOf(value);
    if (index !== -1) {
      filterStore.filter.checked_filter.splice(index, 1);
    }
    updatedModelValue.push(value);
  }

  emit('update:modelValue', updatedModelValue);
};
</script>

<style scoped>
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .hidden-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  
    img{
      z-index: 99999;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0;
      padding: 0;
      display: none;
    }
  }
  
  .hidden-checkbox:checked + .checkmark {
    background-color: #875FFF;
  
    img{
      display: block;
    }
  }
}



.custom-checkbox2 { 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  user-select: none;
  padding: 10px 8px;
  border-radius: 10px;
  border: 1px solid #E9E9E9;
  background-color: #FDFDFD;

  .hidden-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }  

  .label{
    font-size: 13px;
    color: #383838;
  }

  .checkmark {
    display: inline-block;
    margin-right: 8px;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  
    svg{
      position: relative;
      width: 16px;
      height: 16px;
      margin: 0;
      padding: 0;

      path{
        fill: #383838
      }
    }
  }
  
  .hidden-checkbox:checked + .checkmark {
    svg{
      path{
        fill: #875FFF
      }
    }
  }
}

.custom-checkbox3 {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  user-select: none;
  padding: 7px 2px;
  border-radius: 10px;
  background-color: #F6F6F6;

  .hidden-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }  

  .label{
    font-size: 13px;
    color: #383838;
  }

  .checkmark {
    display: inline-block;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  
    img{
      width: 45px;
      height: 32px;
      border-radius: 5px;

    }
  }
  
  .hidden-checkbox:checked + .checkmark {
    svg{
      path{
        fill: #875FFF
      }
    }
  }
}




.custom-checkbox span:last-child {
  margin-left: 8px;
}
</style>

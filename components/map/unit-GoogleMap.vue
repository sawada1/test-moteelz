<script lang="ts" setup>
  import { defineComponent, ref, computed, watch } from 'vue'
  import {
    GoogleMap,
    MarkerCluster,
    CustomMarker,
    Marker,
    InfoWindow
  } from 'vue3-google-map'

  const props = defineProps(['unit'])
  const mapRef = ref(null)
  const markerUnitOpen = ref(null)
  const infoWindowOpened = ref(false)
  const zoom = ref(10)
  const center = ref({ lat: 24.71258066695867, lng: 46.674884506485 })
  const infoWindowPosition = ref(center)
  const mapOptions = ref({
    mapTypeId: 'roadmap',
    position: center.value,
    anchorPoint: 'TOP_CENTER',
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false
  })

  function closeInfoWindow() {
    infoWindowOpened.value = false
  }

  function showInfoWindow(marker: any) {
    markerUnitOpen.value = marker
    //const marker = this.markers.find((m) => m.id === markerId);
    center.value = { lat: marker.unit_lat, lng: marker.unit_lng }
    infoWindowPosition.value = { lat: marker.unit_lat, lng: marker.unit_lng }
    infoWindowOpened.value = true
  }

  function hideInfoWindow() {
    infoWindowOpened.value = false
  }

  onMounted(() => {
    center.value.lat = props.unit.unit_lat
    center.value.lng = props.unit.unit_lng
  })
  onUnmounted(() => {
    closeInfoWindow()
    hideInfoWindow()
  })
</script>
<template>
  <!-- <div class="w-full grid grid-cols-2 lg:grid-cols-2 gap-3 overflow-x-hidden overflow-y-hidden"> -->

  <GoogleMap
    ref="mapRef"
    api-key="AIzaSyCOqEcYZhRD8oqvNxJtjrE9D-qVrXWwsDg"
    class="map h-full"
    :center="{ lat: unit.unit_lat, lng: unit.unit_lng }"
    :zoom="3"
    mapTypeId="roadmap"
    :mapOptions="mapOptions"
  >
    <!-- <template #default="{ ready, api, map, mapTilesLoaded }"> -->
    <MarkerCluster>
      <Marker
        :options="{
          position: { lat: unit.unit_lat, lng: unit.unit_lng },
          anchorPoint: 'CENTER'
        }"
        @click="center = { lat: unit.unit_lat, lng: unit.unit_lng }"
        @mouseover="showInfoWindow(unit)"
        @mouseout="hideInfoWindow"
      >
        <InfoWindow
          :position="{ position: center }"
          :opened="infoWindowOpened"
          @closed="closeInfoWindow"
        >
          <MapUnit :unit="unit" />
        </InfoWindow>
      </Marker>
    </MarkerCluster>

    <!-- </template> -->
  </GoogleMap>
</template>

<style scoped>
  /* .map {
    position: relative;
    width: 100%;
    height: 800px;
} */
  .gm-style-iw .gm-style-iw-c {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
</style>

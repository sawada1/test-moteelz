import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineNuxtPlugin(nuxtApp => {
    console.log('NProgress Plugin Loaded');
    // Inject NProgress into the app context
    nuxtApp.provide('nprogress', NProgress)
    NProgress.configure({
        showSpinner: false, // Disable the spinner
        speed: 1000, // Set the speed of the progress bar
        minimum: 0.2 // Minimum progress percentage
    })
    // Set up global page navigation hooks
    nuxtApp.hook('page:start', () => {
        NProgress.start()
    })

    nuxtApp.hook('page:finish', () => {
        NProgress.done()
    })
})
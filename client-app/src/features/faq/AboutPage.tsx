import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Footer from "@/app/layout/Footer"

export default function HomePage() {
    return (
        <section id="about-page" className="container">
            <div className="lg:h-[100vh] z-0 mt-48 lg:mt-0 flex flex-col justify-end lg:flex-row lg:justify-between items-center gap-8 lg:gap-16" >
                <img className="w-full md:w-[70%] lg:w-[50%] mt-0 lg:mt-24" src="./src/assets/about.svg" alt="hero" draggable="false" />
                <div className="flex flex-col mt-0 lg:mt-24 items-start gap-2 ">
                    <h1 className="max-w-xl text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-800 dark:text-neutral-50"> About Record Rack</h1>
                    <div className="flex flex-col gap-4 mt-8">
                        <p className="max-w-3xl text-base xl:text-xl mx-auto tracking-tight">
                            As a fan of everything related to music, I love keeping track of the songs and albums I love and sharing them with the people around me. But because people use such a wide variety of streaming platforms (i.e Spotify, Apple Music, Amazon, YouTube), it can be hard to connect and share music digitally. <span className="font-bold">Record Rack</span> is the ultimate solution to this problem.
                        </p>
                        <p className="max-w-3xl text-base xl:text-xl mx-auto tracking-tight">
                            Record Rack allows you to curate a digital musical collection. Paying homage to that feeling of community at your local record store, it isn't just about cataloging your music; it's about connecting with a community of fellow music enthusiasts so you can forge connections and explore the musical multiverse.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:h-[50vh] z-0 mt-48 xl:mt-0 flex flex-col justify-end lg:flex-row lg:justify-between items-center gap-8 lg:gap-16">
                <div className="flex flex-col items-start lg:justify-center gap-2">
                    <h1 className="lg:max-w-xl text-5xl xl:text-6xl font-bold text-neutral-800 dark:text-neutral-50"> FAQ</h1>
                    <p className="lg:max-w-xl text-base lg:text-2xl font-semibold tracking-tight">
                        Here to answer all your burning questions. Can't find what you're looking for? Contact me below!
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full lg:w-[45%]">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <p className="text-left">Why can’t I find the album/track/artist I’m looking for?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Because the search system is powered by Spotify, you can only access the albums, tracks and artists that Spotify has made available in any of their digital markets. <strong>Unfortunately, that means any music not accessible on Spotify, is also not accessible on Record Rack.</strong>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <p className="text-left">Is there any way to upload data that isn’t available via Spotify?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-left">At this time, there is no way to upload custom albums or tracks.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <p className="text-left">Can I make my music collection private or public?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            You have full control over the privacy of your music collection. You can customize the privacy settings for individual tracks or albums when you add them to your rack. Your music, your rules!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            <p className="text-left">What data does Record Rack collect?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Record Rack <strong>does not collect any of your personal data, apart from the few details you provide during account creation</strong>. No tracking, analytics, nothing. For that data that is collected, this app uses industry-standard security approaches to protect your information. <a href="" className="font-bold underline"> You can read more about this on our privacy policy.</a>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            <p className="text-left">Is there any data that Record Rack shares?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            The ONLY thing Record Rack shares about you is your email address, which is shared with SendGrid. Their API integration lets this app send you some important emails <strong>like account verification or password resets.</strong> But don't worry - SendGrid is the main digital communications service that powers big companies like Uber, Airbnb, Yelp, Spotify, and many more businesses (80,000 more to be exact). If they can trust SendGrid, so can you! If you're still unsure, <a href="https://www.twilio.com/en-us/legal/privacy." className="font-bold underline">you can find Twilio's (their parent company) privacy policy here.</a>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            <p className="text-left">What if I encounter issues or have feedback about the app?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            I’m here to help! If you encounter any issues or have feedback to share, you can reach out to me via email, or open a ticket on the GitHub page. Your feedback is invaluable in making Record Rack even more fun to use.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="lg:h-[75vh] z-0 mt-24 mb-24 xl:mt-0 flex flex-col lg:flex-row lg:justify-between items-center">
                <Card className="w-full lg:w-2/3">
                    <CardHeader>
                        <CardTitle> Record Rack is completely free to use, with absolutely no ads.</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a className="max-w-3xl text-base xl:text-xl tracking-tight">
                            If you want to support the project in any way, I'll leave some cool links below. If you want to fuel my coffee addiction, that would be super dope! If you want to open tickets on Github and contribute to the project, that would be even doper! If you don't want to do any of those, that's totally dope too - just having people use Record Rack makes me happy!
                        </a>
                    </CardContent>
                    <CardFooter className="w-full flex justify-center gap-4">
                        <Button>
                            <div className="flex flex-row gap-2 items-center">
                                <a href="mailto:alexmanuelt@hotmail.com?subject=Record%20Rack%20Feedback%20" className="hidden md:inline">
                                    Email Me
                                </a>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        </Button>
                        <Button>
                            <div className="flex flex-row gap-2 items-center">
                                <a href="https://github.com/ataverascrespo/RecordRack" className="hidden md:inline">GitHub</a>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        </Button>
                        <Button>
                            <div className="flex flex-row gap-2 items-center">
                                <a href="https://www.buymeacoffee.com/ataverascrespo" className="hidden md:inline">Donate</a>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
                <img className="hidden lg:flex lg:w-[20%]" src="./src/assets/about-contact.svg" alt="hero" draggable="false" />
            </div>
            <Footer></Footer>
        </section>
    )
}

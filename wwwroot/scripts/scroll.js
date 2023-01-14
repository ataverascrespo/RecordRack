//Get album track element
const track = document.getElementById("image-track");
scrollTrack(track);

/*
 * scrollTrack - Handles the logic for the album scrolling + animation on the main rack list page
 */
function scrollTrack(track) {
    //Record "where" the mouse was clicked down, on the x Axis
    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }
    
    //Record "where" the mouse was released
    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        //Store the current 'slider' percentage
        track.dataset.prevPercentage = track.dataset.percentage;
    }
    
    //Upon the mouse moving
    window.onmousemove = e => {
        if(track.dataset.mouseDownAt === "0") return;
    
        //Track mouse delta and max delta
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, 
            maxDelta = window.innerWidth/2;
    
        //Track 'slider' percentage of image track
        const percentage= (mouseDelta / maxDelta) * -100,
            next = parseFloat(track.dataset.prevPercentage) + percentage;
            nextPercentage = Math.max(Math.min(next, 0), -100);
    
        //set the starting percentage to the current percentage
        track.dataset.percentage = nextPercentage;
    
        //Animate the track 
        track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: 1200, fill: "forwards" });
          
        //Introduces a small amount of parallax on the slider animation
        for(const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        } 
    }
}

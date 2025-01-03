# BadUI Battles Manually Winded Clock

BadUI Battles inspired manually winded clock.\
You can view and interact with the UI here: [Manually winded clock](https://lindo-mlambo.github.io/badui-battles-winding-clock/)

### Challenges:

- Clockwise/counter-clockwise movement tracking. I use the arctan function to calculate the angle between the initial point and the position of the cursor: `arctan(x, y)`. The problem: The circle was divided into two halves of the range `[0, Math.PI]` and `[-Math.PI, 0]`. The normalizeAngle method helped greatly handing this as I wanted my angles to go from 0 to `2 * Math.PI`.
- On mobile, you have to tap and hold the red circle to drag it. Not very straight forward. - I could make the dot bigger 🤷‍♂️. I am tired now.
- I took days between working on this and doing something else. A lot happens in December and by the time I return to work on this, I kinda forgot what is going on 😂😂.

### Sources:

- The reddit post: [r/badUIbattles](https://www.reddit.com/r/badUIbattles/comments/1hewwjd/timer_but_you_must_manually_wind_up_the_clock/)
- HTML Drag and Drop API [W3Schools](https://www.w3schools.com/html/html5_draganddrop.asp)

### Continued development:

- Well, I want to add the clock hand, a straight line from the center of the circle to the circumference, this hand will rotate with the red dot as it is moved around the circle.
- A friend thinks I should do more of the BadUI Battles recreations and record them for Youtube, I haven't decided if I want to do this or not.

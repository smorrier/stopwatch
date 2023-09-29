# Stopwatch Component
 * Breaking issues:
   - event handlers were not binded
 * Issues:
   - Start button could be spam clicked and multiple intervals would run
   - Interval was not cleared on unmount (can cause memory leak)
 * Bad practices:
   - forceUpdate generally should not be used
     - It was required because laps was a class attribute instead of a state variable
     - Class attributes are not reactive
 * Code style:
   - Overused ternary operators
     - When 'else' is returning null, you can replace with an and operator
   - Not nesting conditions 
     - Reduces duplicate conditions
     - Makes a function (in this case the render function) difficult to read

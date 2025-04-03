## File paths
1. first we clg path in logs...
2. then we trimmed them and tested if path content were visible by checking the local server
3. the base path is common first 127. . portNum / "`we pass path`"
4. use variables to pass paths in functions
5. ```js
     console.log(e.href.split("/").slice(-2)[0])
   ```
   Gives name of folder...eg link/name
   
   ```js
    let anchors = div.getElementsByTagName("a");
    Array.from(anchors).forEach(e => {
        if(e.href.includes("/songs")){
            console.log(e.href.split("/").slice(-2)[0])
        }
    });
   ```

## See sliders

## See opacity 1 0 css hovers of play buttons

## check table like content appear of not
1. Firstly before starting to work on file contents check if they are visible on local server
2. Error Faced - whilte updating script for dynamic cards..populationg via json...the event listener stopped working and displaying songgs
 this was bcoz..we were using Array.foreach..that was creating problem..as we were using asynchronous style..bbut we dont want asynchronous there..we want to load songs one by one..just immediately after loading folder

so we removed foreach and used normal for loop

![img](https://github.com/Yash-Bandal/YTunes_Music-Player-v1.0/blob/844271b9f5fcac9a452ebd53694bb138a50850dd/Process/TableViewOfContents.png)

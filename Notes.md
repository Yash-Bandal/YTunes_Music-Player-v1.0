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

![img](https://github.com/Yash-Bandal/YTunes_Music-Player-v1.0/blob/844271b9f5fcac9a452ebd53694bb138a50850dd/Process/TableViewOfContents.png)

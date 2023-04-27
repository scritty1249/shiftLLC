:: Run this file before commiting changes, to restore GitHub file format
@echo off 
    setlocal enableextensions enabledelayedexpansion

    set "search=./"
    set "searchII=../"
    set "replace=/shiftLLC/"

    set "index=index.htm"
    set "searchFolder=.\\pages"


    echo TO GITHUB FORMAT
    for /f "delims=" %%i in ('type "%index%" ^& break ^> "%index%" ') do (
        set "line=%%i"
        >>"%index%" echo(!line:%search%=%replace%!)
    )

    :: Correct the syntax
    set "searchFolder=%searchFolder%\\*.htm"
    for %%f in (%searchFolder%) do (
        if "%%~xf"==".htm" (
            set "pagesFolder=%%f !pagesFolder!"
            echo Found %%f
        )
    )
    for %%t in (%pagesFolder%) do (
        set "_textFile=%%t"
        for /f "delims=" %%i in ('type "!_textFile!" ^& break ^> "!_textFile!" ') do (
            set "line=%%i"
            >> "!_textFile!" echo !line:%searchII%=%replace%!
        )
    )
    endlocal
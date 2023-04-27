:: Run this file to preview changes for local development
@echo off 
    setlocal enableextensions enabledelayedexpansion

    set "search=/shiftLLC/"
    set "replace=./"
    set "replaceII=../"

    set "index=index.htm"
    set "searchFolder=.\\pages"

    echo TO LOCAL FORMAT
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
            >> "!_textFile!" echo !line:%search%=%replaceII%!
        )
    )
    endlocal

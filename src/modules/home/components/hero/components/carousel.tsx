import React from 'react';
import Image from 'next/image';
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button } from '@mui/material';

import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { cn } from '@lib/utils';

interface Item {
    header: string;
    description: string;
    bg: string;
    imgUrl: string;
}

const Item = (props: { item: Item }) => {
    
    var header = props.item.header.split("\n")

    // if(isMobile) {
    //     return (
    //         <div className={cn("absolute right-0 left-0 bottom-0 top-0 flex flex-row")} style={{backgroundColor: props.item.bg}}>
    //           <div className="relative h-full">
    //             <Image src={props.item.imgUrl} alt="hero" layout='fill' className='pt-14 w-auto min-w-fit h-auto min-h-fit' priority/>
    //           </div>
    //           <div className="flex flex-col justify-end items-center p-10 w-[40em]">
    //             <Button variant='contained' className='mt-16 rounded-none w-fit py-4 px-8 bg-black text-white text-md !text-opacity-80 normal-case'>Shop Now</Button>
    //           </div>
    //         </div>
    //     )
    // }


    return (
        <div className={cn("absolute right-0 left-0 bottom-0 top-0 flex flex-row")} style={{backgroundColor: props.item.bg}}>
            <div className="relative w-[50vw] h-full ">
                <Image src={props.item.imgUrl+'.svg'} alt="hero" layout='fill' className='pt-14 w-auto min-w-fit h-auto min-h-fit' priority={false}  placeholder="blur"  blurDataURL={props.item.imgUrl+'.png'}/>
            </div>
            <div className="flex flex-col justify-center text-left pr-12 z-10 w-[40em]">
              <h2 className="hidden md:block max-w-[55vw] text-[3.075em] leading-[3.7rem]  libre-baskerville-bold pb-6 ">{header.map((text, i) => <span key={i} className="block">{text}</span>)}</h2>
              <p className="hidden md:block max-w-[55vw] leading-[1.8rem] text-[1.125em] font-sans text-3xl">{props.item.description}</p>
              <Button variant='contained' className='mt-16 rounded-none w-fit py-4 px-8 bg-black text-white text-md !text-opacity-80 normal-case'>Shop Now</Button>
            </div>
        </div>
    )
}

const styles: Record<string, CSSProperties> = {
  buttonWrapper: {
      position: "absolute",
      height: "100px",
      backgroundColor: "transparent",
      top: "calc(50% - 70px)",
      '&:hover': {
          '& $button': {
              backgroundColor: "black",
              filter: "brightness(120%)",
              opacity: "0.4"
          }
      }
  },
  fullHeightHoverWrapper: {
      height: "100%",
      top: "0"
  },
  buttonVisible:{
      opacity: "1"
  },
  buttonHidden:{
      opacity: "0",
  },
  button: {
      margin: "0 10px",
      position: "relative",
      backgroundColor: "red",
      top: "calc(50% - 20px) !important",
      color: "white",
      fontSize: "30px",
      transition: "200ms",
      cursor: "pointer",
      '&:hover': {
          opacity: "0.6 !important"
      },
  },
  // Applies to the "next" button wrapper
  next: {
      right: 0
  },
  // Applies to the "prev" button wrapper
  prev: {
      left: 0
  }
}

const CustomNavButton = ({ onClick, className, style, next, prev }: any) => {

    return (
        <Button onClick={onClick} className={cn(className, styles.button)} style={style}>
          <div className={cn(styles.buttonWrapper, styles.next)}> 
            Hello
          </div>
            {next && "Next"}
            {prev && "Previous"}
        </Button>
    )
}

const StyledCustomNavButton = withStyles(styles)(CustomNavButton);
export { StyledCustomNavButton as CustomNavButton, Item };
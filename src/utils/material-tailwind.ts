import { ThemeProvider } from "@material-tailwind/react";

// Customize default theme
const theme = {
  button: {
    defaultProps: {
      color: "blue",
      variant: "filled",
      size: "md",
      ripple: true,
    },
    styles: {
      variants: {
        text: {
          blue: {
            background: "transparent",
            color: "inherit",
            shadow: "none",
            "&:hover": {
              background: "transparent",
            },
            "&:focus": {
              background: "transparent",
            },
          },
        },
      },
    },
  },
  menu: {
    defaultProps: {
      placement: "bottom",
      offset: 5,
      dismiss: {
        itemPress: true,
      },
    },
    styles: {
      base: {
        menu: {
          p: "p-0",
          border: "border-[0.5px] border-gray-300",
          borderRadius: "rounded-xl",
          boxShadow: "shadow-xl",
          fontSize: "text-sm",
          outline: "outline-none",
        },
        item: {
          initial: {
            display: "block",
            width: "w-full",
            pt: "pt-[9px]",
            pb: "pb-[9px]",
            px: "px-0",
            borderRadius: "rounded-md",
            textAlign: "text-start",
            outline: "outline-none",
            transition: "transition-all",
            cursor: "cursor-pointer",
          },
          hover: {
            bg: "hover:bg-gray-100",
          },
          focus: {
            bg: "focus:bg-gray-100",
          },
          active: {
            bg: "active:bg-gray-100",
          },
          disabled: {
            opacity: "disabled:opacity-50",
            cursor: "disabled:cursor-not-allowed",
            pointerEvents: "disabled:pointer-events-none",
            userSelect: "disabled:select-none",
          },
        },
      },
    },
  },
};

export { ThemeProvider, theme };

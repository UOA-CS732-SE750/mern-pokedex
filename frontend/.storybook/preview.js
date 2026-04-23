import { sb } from 'storybook/test';

// Register modules to mock - this makes them available across all stories
// Using spy: true preserves original functionality while allowing us to track calls
sb.mock(import('../src/hooks/useUpdateFavouriteStatus.js'), { spy: true });

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  }
};

export default preview;

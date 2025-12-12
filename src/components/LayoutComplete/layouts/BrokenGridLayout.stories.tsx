import { expect, userEvent, within } from 'storybook/test'

import BrokenGridLayout from './BrokenGridLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout Complete/Layouts/BrokenGrid',
  component: BrokenGridLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
BrokenGridLayout creates overlapping, asymmetric layouts that break traditional grid constraints for creative visual impact.

## Overview

This layout intentionally breaks conventional grid alignment to create dynamic, eye-catching designs. Elements overlap, rotate, and shift to create visual tension and artistic expression.

## Use Cases

- **Creative Agency Websites**: Showcase artistic capabilities
- **Portfolio Sites**: Display work in unconventional arrangements
- **Art Galleries**: Museum-style presentations
- **Fashion/Lifestyle Brands**: Edgy, modern aesthetics
- **Event Promotions**: Eye-catching promotional layouts

## Key Features

- **Overlap Control**: Subtle to dramatic overlap intensities
- **Style Presets**: Creative, minimal, and bold styles
- **Rotation Effects**: Elements rotate for dynamic composition
- **Client Showcase**: Built-in client logo display
- **Showreel Integration**: Video/demo reel call-to-action
- **Responsive Design**: Adapts to various screen sizes

## Design Principles

1. **Intentional Chaos**: Overlaps are carefully controlled
2. **Visual Hierarchy**: Key content remains prominent
3. **Balance**: Asymmetry is balanced across the composition
4. **Depth**: Z-index creates layered depth effects

## Accessibility

- Text maintains sufficient contrast against backgrounds
- Interactive elements remain keyboard-accessible
- Reduced motion preferences are respected
        `,
      },
    },
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['creative', 'minimal', 'bold'],
      description: 'Visual style preset for the layout',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'creative' },
      },
    },
    overlapIntensity: {
      control: 'select',
      options: ['subtle', 'moderate', 'dramatic'],
      description: 'Intensity of element overlapping',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'moderate' },
      },
    },
    agencyName: {
      control: 'text',
      description: 'Brand/agency name displayed in the hero',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Creative Studio' },
      },
    },
    tagline: {
      control: 'text',
      description: 'Main tagline or headline text',
      table: {
        category: 'Content',
        defaultValue: { summary: 'We Create Digital Experiences' },
      },
    },
    showShowreel: {
      control: 'boolean',
      description: 'Whether to display the showreel button',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    showClients: {
      control: 'boolean',
      description: 'Whether to display client logos',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    onCtaClick: {
      action: 'ctaClicked',
      description: 'Callback when CTA button is clicked',
      table: {
        category: 'Events',
      },
    },
    onShowreelClick: {
      action: 'showreelClicked',
      description: 'Callback when showreel button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    style: 'creative',
    overlapIntensity: 'moderate',
    agencyName: 'Creative Studio',
    tagline: 'We Create Digital Experiences',
    showShowreel: true,
    showClients: true,
  },
} satisfies Meta<typeof BrokenGridLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the BrokenGridLayout component.
 * Use the Controls panel to experiment with styles and overlap intensities.
 */
export const Playground: Story = {
  args: {
    style: 'creative',
    overlapIntensity: 'moderate',
  },
}

/**
 * Basic usage with default settings.
 */
export const Basic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default broken grid layout with moderate overlap and creative style.',
      },
    },
  },
}

/**
 * Real-world example: Creative Agency Landing Page.
 * A production-grade agency website with all features enabled.
 */
export const RealWorld: Story = {
  args: {
    agencyName: 'Pixel Perfect',
    tagline: 'Crafting Digital Excellence',
    style: 'bold',
    overlapIntensity: 'dramatic',
    showShowreel: true,
    showClients: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Production-grade creative agency landing page featuring:
- Bold style with dramatic overlaps
- Custom branding
- Showreel integration
- Client logo showcase
- Multiple project cards
        `,
      },
    },
  },
}

/**
 * Subtle overlap for more conservative designs.
 */
export const SubtleOverlap: Story = {
  args: {
    overlapIntensity: 'subtle',
    style: 'minimal',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal style with subtle overlaps for a cleaner, more professional look.',
      },
    },
  },
}

/**
 * Dramatic overlap for maximum visual impact.
 */
export const DramaticOverlap: Story = {
  args: {
    overlapIntensity: 'dramatic',
    style: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bold style with dramatic overlaps for maximum creative impact.',
      },
    },
  },
}

/**
 * Creative style - the default artistic approach.
 */
export const CreativeStyle: Story = {
  args: {
    style: 'creative',
    overlapIntensity: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Creative style balances artistic expression with usability.',
      },
    },
  },
}

/**
 * Minimal style for cleaner presentations.
 */
export const MinimalStyle: Story = {
  args: {
    style: 'minimal',
    overlapIntensity: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal style reduces visual noise while maintaining broken grid aesthetic.',
      },
    },
  },
}

/**
 * Bold style for high-impact designs.
 */
export const BoldStyle: Story = {
  args: {
    style: 'bold',
    overlapIntensity: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bold style uses stronger colors and more pronounced effects.',
      },
    },
  },
}

/**
 * Without showreel button.
 */
export const WithoutShowreel: Story = {
  args: {
    showShowreel: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout without the showreel/video button for simpler presentations.',
      },
    },
  },
}

/**
 * Without client logos.
 */
export const WithoutClients: Story = {
  args: {
    showClients: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout without the client logos section.',
      },
    },
  },
}

/**
 * Minimal configuration - just the essential elements.
 */
export const MinimalConfiguration: Story = {
  args: {
    showShowreel: false,
    showClients: false,
    style: 'minimal',
    overlapIntensity: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stripped-down version with minimal features for focused presentations.',
      },
    },
  },
}

/**
 * Custom branding example.
 */
export const CustomBranding: Story = {
  args: {
    agencyName: 'DesignFlow',
    tagline: 'Where Creativity Meets Innovation',
    style: 'creative',
    overlapIntensity: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom agency name and tagline.',
      },
    },
  },
}

/**
 * Interaction test: Verifies CTA button click functionality.
 */
export const InteractionTest: Story = {
  args: {
    style: 'creative',
    overlapIntensity: 'moderate',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Find the main CTA button
    const ctaButton = await canvas.findByRole('button', {
      name: /start a project|get started|contact/i,
    })
    await expect(ctaButton).toBeVisible()

    // Click the CTA button
    await userEvent.click(ctaButton)

    // Verify callback was triggered
    if (args.onCtaClick) {
      await expect(args.onCtaClick).toHaveBeenCalled()
    }
  },
}

/**
 * Interaction test: Verifies showreel button functionality.
 */
export const ShowreelInteractionTest: Story = {
  args: {
    showShowreel: true,
    style: 'creative',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Find the showreel button
    const showreelButton = await canvas.findByRole('button', {
      name: /showreel|watch|play/i,
    })
    await expect(showreelButton).toBeVisible()

    // Click the showreel button
    await userEvent.click(showreelButton)

    // Verify callback was triggered
    if (args.onShowreelClick) {
      await expect(args.onShowreelClick).toHaveBeenCalled()
    }
  },
}

/**
 * All three styles side by side for comparison.
 */
export const StyleComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ padding: '1rem', margin: 0 }}>Creative Style</h3>
        <BrokenGridLayout style="creative" overlapIntensity="moderate" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of the creative style preset.',
      },
    },
  },
}

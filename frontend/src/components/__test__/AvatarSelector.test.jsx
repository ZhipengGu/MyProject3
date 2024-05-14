import React from 'react';
import { test, expect, vi } from "vitest";
import { render } from '@testing-library/react';
import AvatarSelector from '../AvatarSelector';

// Mock handleAvatar function
const handleAvatar = vi.fn();

test('AvatarSelector component', () => {
  const selectedAvatar = "avatar1.png";
  const { getByAltText, getByText, getByTestId, queryByTestId } = render(
    <AvatarSelector selectedAvatar={selectedAvatar} handleAvatar={handleAvatar} />
  );

  // Check if selected avatar is rendered
  const selectedAvatarImg = getByAltText('Selected Avatar');
  expect(selectedAvatarImg.getAttribute('src')).toBe(selectedAvatar);


 });

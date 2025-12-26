// Data transformation utilities for employee forms

/**
 * Transform divisions data into select options for forms
 * @param {Array} divisions - Array of division objects
 * @returns {Array} Array of {label, value} objects
 */
export const transformDivisionsToOptions = (divisions) => {
  if (!divisions || !Array.isArray(divisions)) return [];

  return divisions.map((division) => ({
    label: division.name,
    value: division.id,
  }));
};

/**
 * Transform positions from multiple divisions into unified select options
 * Handles positions that exist in multiple divisions by showing all divisions in the label
 * @param {Array} divisions - Array of division objects with positions
 * @returns {Array} Array of {label, value} objects with division info
 */
export const transformPositionsToOptions = (divisions) => {
  if (!divisions || !Array.isArray(divisions)) return [];

  const positionMap = new Map();

  divisions.forEach((division) => {
    if (!division.positions || !Array.isArray(division.positions)) return;

    division.positions.forEach((position) => {
      const positionId = position.id;

      if (positionMap.has(positionId)) {
        // Position exists in multiple divisions, add current division to list
        const existing = positionMap.get(positionId);
        if (!existing.divisions.includes(division.name)) {
          existing.divisions.push(division.name);
        }
      } else {
        // New position, create entry
        positionMap.set(positionId, {
          id: positionId,
          name: position.name,
          divisions: [division.name],
        });
      }
    });
  });

  // Convert Map to array format for select options
  return Array.from(positionMap.values()).map((item) => ({
    label: `${item.name} (${item.divisions.join(", ")})`,
    value: item.id,
  }));
};

/**
 * Validate employee form data before submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result {isValid, errors}
 */
export const validateEmployeeData = (formData) => {
  const errors = {};

  // Required fields validation
  if (!formData.nickname?.trim()) {
    errors.nickname = "Nama panggilan wajib diisi";
  }

  if (!formData.fullname?.trim()) {
    errors.fullname = "Nama lengkap wajib diisi";
  }

  if (!formData.divisionId) {
    errors.divisionId = "Divisi wajib dipilih";
  }

  if (!formData.positionId) {
    errors.positionId = "Posisi wajib dipilih";
  }

  // Length validations
  if (formData.nickname?.length > 50) {
    errors.nickname = "Nama panggilan maksimal 50 karakter";
  }

  if (formData.fullname?.length > 100) {
    errors.fullname = "Nama lengkap maksimal 100 karakter";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format employee data for API submission
 * @param {Object} formData - Raw form data
 * @returns {Object} Formatted data for API
 */
export const formatEmployeeData = (formData) => {
  return {
    nickname: formData.nickname?.trim(),
    fullname: formData.fullname?.trim(),
    divisionId: formData.divisionId,
    positionId: formData.positionId,
  };
};

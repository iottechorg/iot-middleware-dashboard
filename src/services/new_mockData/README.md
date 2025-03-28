# Dynamic Mock Data System

## Overview

This system replaces static mock data with dynamic data generators that produce realistic, random data for each API call. This provides a more lifelike testing experience with greater variation in the data returned.

## Files Structure

- `utils.js` - Helper functions for generating random values, dates, etc.
- `systemSettingsGenerator.js` - Generates system configuration settings
- `networkSettingsGenerator.js` - Generates network interfaces and settings
- `securitySettingsGenerator.js` - Generates security users, certificates, and settings
- `storageSettingsGenerator.js` - Generates storage volumes, databases, and settings
- `deviceManagementGenerator.js` - Generates device management data
- `taskManagementGenerator.js` - Generates task list and detail data
- `dataProcessingGenerator.js` - Generates data processing pipelines and rules
- `dynamicData.js` - Main export file that re-exports all generators

## Advantages

1. **More realistic testing** - Data changes between requests, helping to identify UI issues that might only appear with certain data combinations.
2. **Better edge case coverage** - Random generation occasionally produces edge cases that might not be covered in static data.
3. **Easier to extend** - Adding new fields or variations to the data is simpler.
4. **Performance testing** - Each call produces new data, allowing better stress testing.

## Implementation Details

Each generator function returns freshly generated data with random variations, such as:

- Random status values (online/offline, active/warning/error)
- Random numeric values within realistic ranges
- Random timestamps and durations
- Varied selection from predefined options

## How to Use

In your API or service layer, simply call the appropriate generator function to get fresh data:

```javascript
import { generateDeviceManagementDevices } from './mockData/dynamicData';

// In your API method
const getDevices = async () => {
  await delay(300);
  return generateDeviceManagementDevices();
};
```

## Extending the System

To add a new type of dynamic data:

1. Create a new generator file with functions that return the desired data structure
2. Add random elements using the helper functions from `utils.js`
3. Export your generator functions from the file
4. Add them to the exports in `dynamicData.js`
5. Update your API methods to use the new generators

## Next Steps

To further enhance this system, consider:

1. Adding more random variations to existing generators
2. Converting the remaining static mock data (alerts, metrics, etc.)
3. Adding state persistence so that some changes are remembered between API calls
4. Creating relationships between different data types for more realistic scenarios
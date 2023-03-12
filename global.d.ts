/**
 * WebEngage
 */
declare namespace webengage {
  const user: {
    login(userID: string);
    setAttribute(key: string, value: string);
  };
  function track(event: string, properties?: Record<string, string>);
}

/**
 * RazorPay
 */
declare class Razorpay {
  constructor(options: any);
  on(action: string, callback: (response: any) => any);
  open();
}

/**
 * IppoPay
 */
declare class Ippopay {
  constructor(options: any);
  on(action: string, callback: (response: any) => any);
  open();
  close();
}
declare const ippopayHandler: (type: string, listener: (e: any) => void) => void;
declare const response: string;

/**
 * Unity WebGL
 */
declare function createUnityInstance(canvas: any, config: any, onProgress: any): Promise<any>;

/**
 * Facebook Pixel
 */
declare function fbq(type: string, event: string, data?: Record<string, any>): void;

/**
 * Window
 */
interface Window {
  fcWidget: any;
}

/**
 * Flow Wallet connect
 */
declare module "@onflow/fcl";
declare module "@onflow/types";

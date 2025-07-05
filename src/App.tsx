import React, { useState } from 'react';
import { QrCode, Download, Link, Check, AlertCircle } from 'lucide-react';
import QRCode from 'qrcode';

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  // Enhanced URL validation and normalization
  const normalizeUrl = (inputUrl: string) => {
    let trimmed = inputUrl.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  };

  const validateUrl = (inputUrl: string) => {
    try {
      new URL(normalizeUrl(inputUrl));
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError('');
    setIsValidUrl(newUrl.trim().length > 0 && validateUrl(newUrl));
  };

  const generateQRCode = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a URL');
      return;
    }
    const normalized = normalizeUrl(trimmedUrl);
    if (!validateUrl(trimmedUrl)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }
    setIsGenerating(true);
    setError('');
    try {
      const dataUrl = await QRCode.toDataURL(normalized, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff',
        },
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error('QR Code generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              QR Code Generator
            </h1>
            <p className="text-lg text-gray-600">
              Transform any link into a beautiful QR code instantly
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* URL Input Section */}
              <div className="mb-8">
                <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter your link (with or without https://)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Link className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyPress={handleKeyPress}
                    placeholder="example.com or https://example.com"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                  {isValidUrl && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {error && (
                  <div className="mt-3 flex items-center text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={generateQRCode}
                disabled={!url.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating QR Code...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <QrCode className="w-5 h-5 mr-2" />
                    Generate QR Code
                  </div>
                )}
              </button>
            </div>

            {/* QR Code Display */}
            {qrCodeDataUrl && (
              <div className="bg-gray-50 border-t border-gray-100 p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Your QR Code is Ready!
                  </h3>
                  <div className="inline-block bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <img
                      src={qrCodeDataUrl}
                      alt="Generated QR Code"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadQRCode}
                      className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download QR Code
                    </button>
                    <button
                      onClick={() => {
                        setQrCodeDataUrl('');
                        setUrl('');
                        setIsValidUrl(false);
                        setError('');
                      }}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      Generate New QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <QrCode className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                High Quality
              </h3>
              <p className="text-gray-600">
                Generate crisp, high-resolution QR codes perfect for any use case
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Download
              </h3>
              <p className="text-gray-600">
                Download your QR codes as PNG images ready for print or digital use
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Link className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Any Link
              </h3>
              <p className="text-gray-600">
                Works with any valid link - websites, social media, contact info, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;